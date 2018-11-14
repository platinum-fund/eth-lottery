import web3 from 'web3'

export const fromWei = value => Number(web3.utils.fromWei(value, 'ether'))

export const fromWeiRounded = value => Math.round(fromWei(value) * 100) / 100

export const fromWeiHex = value => fromWei(hexToNumberString(value))

export const hexToNumberString = value => web3.utils.hexToNumberString(value)

export const responseSuccess = value => ({
  status: '1',
  result: value
})

export const responseError = (error, value = '') => ({
  status: '0',
  result: value,
  error: error instanceof Error ? error.message : error
})

export const roundFixed = (value, multiplier = 100) =>
  Math.round(value * multiplier) / multiplier
