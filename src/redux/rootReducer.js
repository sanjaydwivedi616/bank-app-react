import { combineReducers } from 'redux'
import userReducer from './login/loginReducer'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer;
