const {
  REACT_APP_CONTRACT_ADDRESS,
  REACT_APP_ETHERSCAN_API_URL,
  REACT_APP_ETHERSCAN_URL
} = process.env

const config = {
  contract: REACT_APP_CONTRACT_ADDRESS,
  apiUrl: REACT_APP_ETHERSCAN_API_URL,
  etherscanUrl: REACT_APP_ETHERSCAN_URL,
  blockInfo: '&fromBlock=379224&toBlock=latest',
  balanceInfo: 'account&action=balance&tag=latest'
}

const contractBalance = () => {
  const url = `${config.apiUrl}${config.balanceInfo}&address=${config.contract}`
  return fetch(url)
}

export default {
  contractBalance
}
