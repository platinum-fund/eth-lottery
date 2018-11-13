import RequestService from 'services/RequestService'

const {
  REACT_APP_CONTRACT_ADDRESS,
  REACT_APP_ETHERSCAN_API_URL,
  REACT_APP_ETHERSCAN_URL,
  REACT_APP_ETHERSCAN_APIKEY,
  REACT_APP_CHARITY_PAYED
} = process.env

const config = {
  contract: REACT_APP_CONTRACT_ADDRESS,
  apiUrl: REACT_APP_ETHERSCAN_API_URL,
  apiKey: REACT_APP_ETHERSCAN_APIKEY,
  etherscanUrl: REACT_APP_ETHERSCAN_URL,
  addressCharityPayed: REACT_APP_CHARITY_PAYED,
  blockInfo: '&fromBlock=379224&toBlock=latest',
  balanceInfo: 'account&action=balance&tag=latest',
  getLogs: 'logs&action=getLogs'
}

const requestWithApikey = url =>
  RequestService.get(`${url}&apikey=${config.apiKey}`)

const contractBalance = () => {
  const url = `${config.apiUrl}${config.balanceInfo}&address=${config.contract}`
  return requestWithApikey(url) //fetch(url)
}

const totalCharityHistory = () => {
  const url = `${config.apiUrl}${config.getLogs}${config.balanceInfo}&address=${
    config.contract
  }&topic0=${config.addressCharityPayed}`
  return requestWithApikey(url)
}

export default {
  contractBalance,
  totalCharityHistory
}
