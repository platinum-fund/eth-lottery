import { combineReducers } from 'redux'
import preferencesReducer from './preferences/reducers.js'
import fundReducer from './fund/reducers.js'

const rootReducer = combineReducers({
  preferences: preferencesReducer,
  fund: fundReducer
})

export default rootReducer
