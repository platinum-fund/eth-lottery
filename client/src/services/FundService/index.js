import { mergeAll } from 'ramda'
import Etherscan from './Etherscan'
import { roundFixed } from './Utils'

const getStatistics = async () => {
  /**
   * DO NOT CHANGE THE ORDER!
   */
  const params = [
    { param: 'fundBalance', method: Etherscan.contractBalance },
    { param: 'donated', method: Etherscan.totalCharity },
    { param: 'totalInvestors', method: Etherscan.totalInvestors },
    { param: 'paid', method: Etherscan.totalPaid }
  ]

  let statResults
  let recentTransactions = []

  /**
   * DO NOT CHANGE THE ORDER!
   */
  await Promise.all([
    Etherscan.contractBalance(),
    Etherscan.totalCharity(),
    Etherscan.totalInvestors(txns => {
      recentTransactions = txns
    }),
    Etherscan.totalPaid()
  ])
    .then(res => {
      statResults = res
    })
    .catch(err => console.error('err', err))

  const result = mergeAll(
    params.map((param, index) => ({ [param.param]: statResults[index].result }))
  )
  const sumTransactions = roundFixed(
    recentTransactions.reduce((sum, o) => sum + o.deposit, 0)
  )

  return {
    ...result,
    ...{ recentTransactions },
    ...{ sumTransactions }
  }
}

const getContributionStat = async address => {
  try {
    const { status, result } = await Etherscan.getDepositHistory(address)
    if (status === '0' || !result) return {}
    const { statistics, depositHistory } = result

    const dividendStat = await Etherscan.getDividendStatistics(
      address,
      depositHistory
    )
    const statisticsPayed =
      dividendStat.status !== '0' ? dividendStat.result : []

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

    return statistics
  } catch (e) {
    console.log(e)
    return []
  }
}

export default {
  getStatistics,
  getContributionStat
}
