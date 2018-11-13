import web3 from 'web3'
import Infura from './Infura'
import Etherscan from './Etherscan'

const fromWei = value => web3.utils.fromWei(value, 'ether')
const fromWeiRounded = value => Math.round(fromWei(value) * 100) / 100

export default {
  fundBalance: Etherscan.contractBalance,
  fromWei,
  fromWeiRounded
}
