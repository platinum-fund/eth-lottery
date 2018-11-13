import { assoc } from 'ramda'
import * as AT from './actionTypes'
import FundService from 'services/FundService'

const INITIAL_STATE = {
  totalInvestors: 0,
  fundBalance: 1,
  donated: 2,
  paid: 3,
  recentTransactions: []
}

const fund = (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case AT.SET_TOTAL_INVESTORS: {
      const { value } = payload
      return assoc('totalInvestors', value, state)
    }
    case AT.SET_FUND_BALANCE: {
      const { value } = payload
      return assoc('fundBalance', value, state)
    }
    case AT.SET_DONATED: {
      const { value } = payload
      return assoc('donated', value, state)
    }
    case AT.SET_PAID: {
      const { value } = payload
      return assoc('paid', value, state)
    }
    case AT.SET_RECENT_TRANSACTIONS: {
      return assoc('recentTransactions', payload, state)
    }
    case AT.GET_FUND_BALANCE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case AT.GET_FUND_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        fundBalance: FundService.fromWeiRounded(action.payload.data.result)
      }
    case AT.GET_FUND_BALANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        fundBalance: 0
      }
    default:
      return state
  }
}

export default fund
