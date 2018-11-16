import RequestService from 'services/RequestService'
import * as utils from './Utils'

const {
  REACT_APP_CONTRACT_ADDRESS,
  REACT_APP_ETHERSCAN_API_URL,
  REACT_APP_ETHERSCAN_URL,
  REACT_APP_ETHERSCAN_APIKEY,
  REACT_APP_CHARITY_PAYED,
  REACT_APP_CHARITY_PERCENT,
  REACT_APP_DEPOSIT_PAYED,
  REACT_APP_DIVIDEND_PAYED
} = process.env

const config = {
  contract: REACT_APP_CONTRACT_ADDRESS,
  apiUrl: REACT_APP_ETHERSCAN_API_URL,
  apiKey: REACT_APP_ETHERSCAN_APIKEY,
  etherscanUrl: REACT_APP_ETHERSCAN_URL,
  addressCharityPayed: REACT_APP_CHARITY_PAYED,
  charityPercent: REACT_APP_CHARITY_PERCENT,
  addressDepositPayed: REACT_APP_DEPOSIT_PAYED,
  addressDividendPayed: REACT_APP_DIVIDEND_PAYED,
  blockInfo: '&fromBlock=379224&toBlock=latest',
  balanceInfo: 'account&action=balance&tag=latest',
  getLogs: 'logs&action=getLogs',
  lastTxnLimit: 4
}

const requestWithApikey = url =>
  RequestService.get(`${url}&apikey=${config.apiKey}`)

const contractBalance = () => {
  const url = `${config.apiUrl}${config.balanceInfo}&address=${config.contract}`

  return requestWithApikey(url)
    .then(res => {
      const { status, result } = res

      if (status !== '1') return utils.responseError('No balance', '0')

      return utils.responseSuccess(utils.roundFixed(utils.fromWei(result)))
    })
    .catch(err => utils.responseError(err, '0'))
}

const totalCharityHistory = () => {
  const url = `${config.apiUrl}${config.getLogs}${config.blockInfo}&address=${
    config.contract
  }&topic0=${config.addressCharityPayed}`

  return requestWithApikey(url)
}

const totalCharity = () => {
  return totalCharityHistory()
    .then(res => {
      const { status, result: history = [] } = res

      if (status !== '1') return utils.responseError('No history', '0')

      const totalCharity = history.reduce(
        (total, item) => (total += utils.fromWeiHex(item.data)),
        0
      )

      return utils.responseSuccess(
        utils.roundFixed((totalCharity * config.charityPercent) / 100)
      )
    })
    .catch(err => utils.responseError(err, '0'))
}

const totalInvestors = callback => {
  const url = `${config.apiUrl}${config.getLogs}${config.blockInfo}&address=${
    config.contract
  }&topic0=${config.addressDepositPayed}`
  let recentTransactions = []

  return requestWithApikey(url)
    .then(res => {
      const { status, result = [] } = res

      if (status !== '1') return utils.responseError('No investors', '0')

      const deposits = result.reverse()
      const totalInvestors = []
      let txList = 0

      for (let i = 0; i < deposits.length; i++) {
        if (!totalInvestors.includes(deposits[i].topics[1]))
          totalInvestors.push(deposits[i].topics[1])

        if (txList < config.lastTxnLimit) {
          const deposit = utils.roundFixed(
            utils.fromWeiHex(deposits[i].data),
            1000
          )
          const hash = deposits[i].transactionHash

          recentTransactions.push({
            link: `${config.etherscanUrl}/tx/${hash}`,
            hash,
            deposit
          })

          txList++
        }
      }

      callback(recentTransactions)

      return utils.responseSuccess(totalInvestors.length)
    })
    .catch(err => utils.responseError(err, '0'))
}

const totalPaid = () => {
  const url = `${config.apiUrl}${config.getLogs}${config.blockInfo}&address=${
    config.contract
  }&topic0=${config.addressDividendPayed}`

  return requestWithApikey(url)
    .then(res => {
      const { status, result: history = [] } = res

      if (status !== '1') return utils.responseError('No dividend history', '0')

      const totalDividendPayed = history.reduce(
        (total, item) =>
          (total += Number(utils.fromWeiHex(`0x${item.data.slice(130)}`))),
        0
      )

      return utils.responseSuccess(utils.roundFixed(totalDividendPayed, 1000))
    })
    .catch(err => utils.responseError(err, '0'))
}

const getDepositHistory = address => {
  const url = `${config.apiUrl}${config.getLogs}${config.blockInfo}&address=${
    config.contract
  }&topic0=${config.addressDepositPayed}&topic1=${address}`

  return requestWithApikey(url)
    .then(res => utils.responseResultOrError(res, 'No deposit history'))
    .catch(err => utils.responseError(err, '0'))
}

const getDividendHistory = address => {
  const url = `${config.apiUrl}${config.getLogs}${config.blockInfo}&address=${
    config.contract
  }&topic0=${config.addressDividendPayed}&topic1=${address}`

  return requestWithApikey(url)
    .then(res => utils.responseResultOrError(res, 'No dividend history'))
    .catch(err => utils.responseError(err, '0'))
}

const getFunds = async address => {
  try {
    let {
      status: depStatus,
      result: depositHistory = []
    } = await getDepositHistory(address)
    let {
      status: divStatus,
      result: dividendHistory = []
    } = await getDividendHistory(address)
    let statistics = []
    let statisticsPayed = []

    if (depStatus === '1') {
      depositHistory = depositHistory.reverse()

      statistics = depositHistory.reduce((result, item) => {
        const depositNumber = utils.hexToNumber(item.topics[2])
        const deposit = utils.roundFixed(
          utils.fromWeiHex(item.data.slice(0, 66)),
          1000
        )
        const depositTime = utils.hexToNumber(item.timeStamp) * 1000
        const currentTimestamp = +new Date()
        const delta = Math.abs(currentTimestamp - depositTime) / 1000
        const minutes = Math.floor(delta / 60)
        const currenctPercent = Math.round(0.00208 * minutes * 1000) / 1000
        const allWithdraw = 0
        const percentPayed = 150
        const tx = {
          depositNumber,
          deposit,
          currenctPercent,
          allWithdraw,
          percentPayed
        }

        result.push({ tx })

        return result
      }, [])
    }

    if (divStatus === '1') {
      dividendHistory = dividendHistory.reverse()

      statisticsPayed = dividendHistory.reduce((result, item) => {
        const depositNumber = utils.hexToNumber(item.topics[2])
        if (!depositHistory.includes(depositNumber)) {
          const deposit = utils.roundFixed(
            utils.fromWeiHex(item.data.slice(0, 66)),
            1000
          )
          const allWithdraw = utils.roundFixed(
            utils.fromWeiHex(item.data.slice(66, 130)),
            100000
          )
          const percentPayed = 150 - (150 * allWithdraw) / (deposit * 2.5)
          const txPayed = {
            depositNumber: depositNumber + 1,
            deposit,
            allWithdraw,
            percentPayed
          }
          result.push({ txPayed })
          depositHistory.push(depositNumber)
        }

        return result
      }, [])
    }

    for (let j = 0; j < statistics.length; j++) {
      for (let k = 0; k < statisticsPayed.length; k++) {
        if (
          statistics[j].tx.depositNumber ===
          statisticsPayed[k].txPayed.depositNumber
        ) {
          statistics[j].tx.allWithdraw = statisticsPayed[k].txPayed.allWithdraw
          statistics[j].tx.percentPayed =
            statisticsPayed[k].txPayed.percentPayed
        }
      }
    }
    return utils.responseSuccess(statistics)
  } catch (err) {
    return utils.responseError(err, '0')
  }
}

export default {
  contractBalance,
  totalCharity,
  totalInvestors,
  totalPaid,
  getFunds
}
