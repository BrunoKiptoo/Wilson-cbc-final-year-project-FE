import { toast } from 'react-toastify'
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LIST_REQUEST,
  ADMIN_LIST_SUCCESS,
  ADMIN_LIST_FAIL,
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_DETAILS_FAIL,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL,
  ADMIN_DELETE_REQUEST,
  ADMIN_DELETE_SUCCESS,
  ADMIN_DELETE_FAIL,
  ADMIN_DELETE_ALL_REQUEST,
  ADMIN_DELETE_ALL_SUCCESS,
  ADMIN_DELETE_ALL_FAIL,
  ADMIN_SEARCH_REQUEST,
  ADMIN_SEARCH_SUCCESS,
  ADMIN_SEARCH_FAIL,
} from '../constants/adminConstants'

const initialState = {
  adminInfo: JSON.parse(localStorage.getItem('adminInfo')) || null,
  loading: false,
  error: null,
}

export const adminLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { ...state, loading: true, error: null }

    case ADMIN_LOGIN_SUCCESS:
      toast.success('Login successful!')
      return { ...state, loading: false, adminInfo: action.payload }

    case ADMIN_LOGIN_FAIL:
      toast.error(action.payload)
      return { ...state, loading: false, error: action.payload }

    case ADMIN_LOGOUT:
      localStorage.removeItem('adminInfo')
      return { ...state, adminInfo: null } // Reset adminInfo to null on logout

    default:
      return state
  }
}

export const adminRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return { loading: true }
    case ADMIN_REGISTER_SUCCESS:
      toast.success('Admin registered successfully')
      return { loading: false, adminInfo: action.payload }
    case ADMIN_REGISTER_FAIL:
      toast.error(action.payload)
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminListReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_REQUEST:
      return { loading: true }
    case ADMIN_LIST_SUCCESS:
      return { loading: false, admins: action.payload }
    case ADMIN_LIST_FAIL:
      toast.error(action.payload)
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminDetailsReducer = (state = { admin: {} }, action) => {
  switch (action.type) {
    case ADMIN_DETAILS_REQUEST:
      return { loading: true }
    case ADMIN_DETAILS_SUCCESS:
      return { loading: false, admin: action.payload }
    case ADMIN_DETAILS_FAIL:
      toast.error(action.payload)
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_REQUEST:
      return { loading: true }
    case ADMIN_UPDATE_SUCCESS:
      toast.success('Admin updated successfully')
      return { loading: false, success: true, admin: action.payload }
    case ADMIN_UPDATE_FAIL:
      toast.error(action.payload)
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_REQUEST:
      return { loading: true }
    case ADMIN_DELETE_SUCCESS:
      toast.success('Admin deleted successfully')
      return { loading: false, success: true }
    case ADMIN_DELETE_FAIL:
      toast.error(action.payload)
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminDeleteAllReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_ALL_REQUEST:
      return { loading: true }
    case ADMIN_DELETE_ALL_SUCCESS:
      toast.success('All admins deleted successfully')
      return { loading: false, success: true }
    case ADMIN_DELETE_ALL_FAIL:
      toast.error(action.payload)
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminSearchReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case ADMIN_SEARCH_REQUEST:
      return { loading: true }
    case ADMIN_SEARCH_SUCCESS:
      return { loading: false, admins: action.payload }
    case ADMIN_SEARCH_FAIL:
      toast.error(action.payload)
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
