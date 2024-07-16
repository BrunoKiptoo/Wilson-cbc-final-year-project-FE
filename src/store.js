import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  studentCreateReducer,
  studentListReducer,
  studentDetailsReducer,
  studentUpdateReducer,
  studentDeleteReducer,
  studentDeleteAllReducer,
  studentSearchReducer,
} from './reducers/studentReducers'
import {
  adminLoginReducer,
  adminRegisterReducer,
  adminListReducer,
  adminDetailsReducer,
  adminUpdateReducer,
  adminDeleteReducer,
  adminDeleteAllReducer,
  adminSearchReducer,
} from './reducers/adminReducers'

const reducer = combineReducers({
  studentCreate: studentCreateReducer,
  studentList: studentListReducer,
  studentDetails: studentDetailsReducer,
  studentUpdate: studentUpdateReducer,
  studentDelete: studentDeleteReducer,
  studentDeleteAll: studentDeleteAllReducer,
  studentSearch: studentSearchReducer,
  adminLogin: adminLoginReducer,
  adminRegister: adminRegisterReducer,
  adminList: adminListReducer,
  adminDetails: adminDetailsReducer,
  adminUpdate: adminUpdateReducer,
  adminDelete: adminDeleteReducer,
  adminDeleteAll: adminDeleteAllReducer,
  adminSearch: adminSearchReducer,
})

const adminInfoFromStorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null

const initialState = {
  adminLogin: { adminInfo: adminInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
