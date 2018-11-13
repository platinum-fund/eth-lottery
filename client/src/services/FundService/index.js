import web3 from 'web3'
import Infura from './Infura'
import Etherscan from './Etherscan'

const fromWei = value => web3.utils.fromWei(value, 'ether')
const fromWeiRounded = value => Math.round(fromWei(value) * 100) / 100

const getStatistics = async () => {
  const params = [
    { param: 'fundBalance', method: Etherscan.contractBalance },
    { param: 'totalCharityHistory', method: Etherscan.totalCharityHistory }
  ]

  let statResults

  await Promise.all([
    Etherscan.contractBalance(),
    Etherscan.totalCharityHistory()
  ])
    .then(res => {
      statResults = res
    })
    .catch(err => console.error('err', err))

  for (let i = 0; i < statResults.length; i++) {
    console.log(i, params[i].param, statResults[i])
  }
}

export default {
  getStatistics,
  fundBalance: Etherscan.contractBalance,
  fromWei,
  fromWeiRounded
}
