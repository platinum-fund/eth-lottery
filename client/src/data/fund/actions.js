import * as AT from './actionTypes'
import FundService from 'services/FundService'

export const setTotalInvestors = value => ({
  type: AT.SET_TOTAL_INVESTORS,
  payload: { value }
})

export const setFundBalance = value => ({
  type: AT.SET_FUND_BALANCE,
  payload: { value }
})

export const getFundBalance = () => {
  return dispatch => {
    dispatch({
      type: AT.GET_FUND_BALANCE_BEGIN
    })

    return FundService.fundBalance()
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: AT.GET_FUND_BALANCE_SUCCESS,
          payload: { data }
        })
        return data
      })
      .catch(error =>
        dispatch({
          type: AT.GET_FUND_BALANCE_FAILURE,
          payload: { error }
        })
      )
  }
}

export const getFundBalanceBegin = () => ({
  type: AT.GET_FUND_BALANCE_BEGIN
})

export const getFundBalanceSuccess = data => ({
  type: AT.GET_FUND_BALANCE_SUCCESS,
  payload: { data }
})

export const getFundBalanceFailure = error => ({
  type: AT.GET_FUND_BALANCE_FAILURE,
  payload: { error }
})

export const setDonated = value => ({
  type: AT.SET_DONATED,
  payload: { value }
})

export const setPaid = value => ({
  type: AT.SET_PAID,
  payload: { value }
})

export const setRecentTransactions = transactions => ({
  type: AT.SET_RECENT_TRANSACTIONS,
  payload: transactions
})

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
