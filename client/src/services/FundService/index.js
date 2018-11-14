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

export default {
  getStatistics
}
