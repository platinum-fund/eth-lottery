import RequestService from 'services/RequestService'
import * as utils from './Utils'
import { pathOr } from 'ramda'

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
      if (!res || res.status !== '1')
        return utils.responseError('No balance', '0')

      return utils.responseSuccess(utils.roundFixed(utils.fromWei(res.result)))
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
      if (!res || res.status !== '1')
        return utils.responseError('No history', '0')

      const history = pathOr([], ['result'], res)
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
      if (!res || res.status !== '1')
        return utils.responseError('No investors', '0')

      const deposits = pathOr([], ['result'], res).reverse()
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
      if (!res || res.status !== '1')
        return utils.responseError('No dividend history', '0')

      const history = pathOr([], ['result'], res)
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
    .then(res => {
      if (!res || res.status !== '1')
        return utils.responseError('No deposit history', '0')

      const depositHistory = pathOr([], ['result'], res).reverse()

      const statistics = depositHistory.reduce((result, item) => {
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

      return utils.responseSuccess({ statistics, depositHistory })
    })
    .catch(err => utils.responseError(err, '0'))
}

const getDividendStatistics = (address, depositHistory) => {
  const url = `${config.apiUrl}${config.getLogs}${config.blockInfo}&address=${
    config.contract
  }&topic0=${config.addressDividendPayed}&topic1=${address}`

  return requestWithApikey(url)
    .then(res => {
      if (!res || res.status !== '1')
        return utils.responseError('No dividend history', '0')

      const dividendHistory = pathOr([], ['result'], res).reverse()

      const statistics = dividendHistory.reduce((result, item) => {
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

      return utils.responseSuccess(statistics)
    })
    .catch(err => utils.responseError(err, '0'))
}

export default {
  contractBalance,
  totalCharityHistory,
  totalCharity,
  totalInvestors,
  totalPaid,
  getDepositHistory,
  getDividendStatistics
}
