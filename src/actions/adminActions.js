import axios from 'axios'
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
import { toast } from 'react-toastify'

const API_URL = //'http://localhost:8081/api/v1/admin'
'https://wilson-cbc-final-year-project.onrender.com/api/v1/admin'

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST })
    const { data } = await axios.post(`${API_URL}/login`, {
      username,
      password,
    })
    console.log('Response Data:', data) // Log response data
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('adminInfo', JSON.stringify(data.data))
    toast.success('Login successful')
  } catch (error) {
    console.error('Login Error:', error) // Log error for debugging
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Login failed. Please try again.')
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('adminInfo')
  dispatch({ type: ADMIN_LOGOUT })
  toast.success('Logged out successfully')
}

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REGISTER_REQUEST })
    const { data } = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    })
    console.log('Response Data:', data)
    dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data })
    localStorage.setItem('adminInfo', JSON.stringify(data.data))
    toast.success('Admin registered successfully')
  } catch (error) {
    console.error('Registration Error:', error)
    dispatch({
      type: ADMIN_REGISTER_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Registration failed. Please try again.')
  }
}

export const listAdmins =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_LIST_REQUEST })
      const { data } = await axios.get(
        `${API_URL}/all?page=${page}&limit=${limit}`
      )
      dispatch({ type: ADMIN_LIST_SUCCESS, payload: data })
      toast.success('Admin list retrieved successfully')
    } catch (error) {
      dispatch({
        type: ADMIN_LIST_FAIL,
        payload: error.response?.data.message || error.message,
      })
      toast.error('Failed to retrieve admin list')
    }
  }

export const getAdminDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DETAILS_REQUEST })
    const { data } = await axios.get(`${API_URL}/single/${id}`)
    dispatch({ type: ADMIN_DETAILS_SUCCESS, payload: data })
    toast.success('Admin details retrieved successfully')
  } catch (error) {
    dispatch({
      type: ADMIN_DETAILS_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Failed to retrieve admin details')
  }
}

export const updateAdmin = (id, adminData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_REQUEST })
    const { data } = await axios.put(`${API_URL}/single/${id}`, adminData)
    dispatch({ type: ADMIN_UPDATE_SUCCESS, payload: data })
    toast.success('Admin updated successfully')
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Failed to update admin')
  }
}

export const deleteAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_REQUEST })
    await axios.delete(`${API_URL}/single/${id}`)
    dispatch({ type: ADMIN_DELETE_SUCCESS, payload: id })
    toast.success('Admin deleted successfully')
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Failed to delete admin')
  }
}

export const deleteAllAdmins = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_ALL_REQUEST })
    await axios.delete(`${API_URL}/all`)
    dispatch({ type: ADMIN_DELETE_ALL_SUCCESS })
    toast.success('All admins deleted successfully')
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_ALL_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Failed to delete all admins')
  }
}

export const searchAdmins = (query) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_SEARCH_REQUEST })
    const { data } = await axios.get(`${API_URL}/search?query=${query}`)
    dispatch({ type: ADMIN_SEARCH_SUCCESS, payload: data })
    toast.success('Admin search successful')
  } catch (error) {
    dispatch({
      type: ADMIN_SEARCH_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Failed to search admins')
  }
}
