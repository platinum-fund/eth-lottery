import Web3 from 'web3'

const provider = `https://${process.env.REACT_APP_INFURA_NET}.infura.io/`

const web3 = new Web3(new Web3.providers.HttpProvider(provider))
