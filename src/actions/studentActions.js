import axios from 'axios'
import {
  STUDENT_CREATE_REQUEST,
  STUDENT_CREATE_SUCCESS,
  STUDENT_CREATE_FAIL,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL,
  STUDENT_DELETE_REQUEST,
  STUDENT_DELETE_SUCCESS,
  STUDENT_DELETE_FAIL,
  STUDENT_DELETE_ALL_REQUEST,
  STUDENT_DELETE_ALL_SUCCESS,
  STUDENT_DELETE_ALL_FAIL,
  STUDENT_SEARCH_REQUEST,
  STUDENT_SEARCH_SUCCESS,
  STUDENT_SEARCH_FAIL,
} from '../constants/studentConstants'
import { toast } from 'react-toastify'

const API_URL = //'http://localhost:8081/api/v1/student'
'https://wilson-cbc-final-year-project.onrender.com/api/v1/student'

export const createStudent = (studentData) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_CREATE_REQUEST })
    const { data } = await axios.post(`${API_URL}/new`, studentData)
    dispatch({ type: STUDENT_CREATE_SUCCESS, payload: data })
    toast.success('Student created successfully')
  } catch (error) {
    dispatch({
      type: STUDENT_CREATE_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Failed to create student')
  }
}

export const listStudents =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: STUDENT_LIST_REQUEST })
      const { data } = await axios.get(
        `${API_URL}/all?page=${page}&limit=${limit}`
      )
      dispatch({ type: STUDENT_LIST_SUCCESS, payload: data.data })
      toast.success('Student list retrieved successfully')
    } catch (error) {
      dispatch({
        type: STUDENT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
      toast.error('Failed to retrieve student list')
    }
  }

export const searchStudents = (searchParams) => async (dispatch) => {
  dispatch({ type: STUDENT_SEARCH_REQUEST })

  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: searchParams,
    })

    dispatch({
      type: STUDENT_SEARCH_SUCCESS,
      payload: response.data.students || response.data.data.students || [],
    })
    toast.success('Student search successful')
  } catch (error) {
    dispatch({
      type: STUDENT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to retrieve students',
    })
    toast.error('Failed to search students')
  }
}

export const getStudentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_DETAILS_REQUEST })
    const { data } = await axios.get(`${API_URL}/single/${id}`)
    dispatch({ type: STUDENT_DETAILS_SUCCESS, payload: data.data })
    toast.success('Student details retrieved successfully')
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    toast.error('Failed to retrieve student details')
  }
}

export const updateStudent = (id, studentData) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_UPDATE_REQUEST })
    const { data } = await axios.put(`${API_URL}/single/${id}`, studentData)
    dispatch({ type: STUDENT_UPDATE_SUCCESS, payload: data })
    toast.success('Student updated successfully')
  } catch (error) {
    dispatch({
      type: STUDENT_UPDATE_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Failed to update student')
  }
}

export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_DELETE_REQUEST })
    await axios.delete(`${API_URL}/single/${id}`)
    dispatch({ type: STUDENT_DELETE_SUCCESS, payload: id })
    toast.success('Student deleted successfully')
  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Failed to delete student')
  }
}
//
export const deleteAllStudents = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_DELETE_ALL_REQUEST })
    await axios.delete(`${API_URL}/all_students`)
    dispatch({ type: STUDENT_DELETE_ALL_SUCCESS })
    toast.success('All students deleted successfully')
  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_ALL_FAIL,
      payload: error.response?.data.message || error.message,
    })
    toast.error('Failed to delete all students')
  }
}
