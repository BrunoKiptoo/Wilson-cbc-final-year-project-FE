import { toast } from 'react-toastify'
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

const initialState = {
  students: [],
  loading: false,
  error: null,
}

export const studentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_CREATE_REQUEST:
      return { loading: true }
    case STUDENT_CREATE_SUCCESS:
      toast.success('Student created successfully')
      return { loading: false, success: true, student: action.payload }
    case STUDENT_CREATE_FAIL:
      toast.error(action.payload.message || 'Failed to create student')
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const studentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LIST_REQUEST:
      return { ...state, loading: true }
    case STUDENT_LIST_SUCCESS:
      return { loading: false, students: action.payload.students }
    case STUDENT_LIST_FAIL:
      toast.error(action.payload)
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const initState = {
  students: [],
  loading: false,
  error: null,
}

export const studentSearchReducer = (state = initState, action) => {
  switch (action.type) {
    case STUDENT_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case STUDENT_SEARCH_SUCCESS:
      toast.success('Students retrieved successfully')
      return {
        ...state,
        loading: false,
        students: action.payload,
        error: null,
      }
    case STUDENT_SEARCH_FAIL:
      toast.error('Failed to retrieve students. Please try again.')
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const studentDetailsReducer = (state = { student: {} }, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { loading: true }
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, student: action.payload }
    case STUDENT_DETAILS_FAIL:
      toast.error(action.payload)
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const studentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_UPDATE_REQUEST:
      return { ...state, loading: true }
    case STUDENT_UPDATE_SUCCESS:
      toast.success(action.payload.message || 'Student updated successfully')
      return {
        ...state,
        loading: false,
        success: true,
        student: action.payload.data,
      }
    case STUDENT_UPDATE_FAIL:
      toast.error(action.payload.message || 'Failed to update student')
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const studentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_DELETE_REQUEST:
      return { loading: true }
    case STUDENT_DELETE_SUCCESS:
      toast.success('Student deleted successfully')
      return { loading: false, success: true }
    case STUDENT_DELETE_FAIL:
      toast.error(action.payload.message || 'Failed to delete student')
      return { loading: false, error: action.payload.message }
    default:
      return state
  }
}

export const studentDeleteAllReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_DELETE_ALL_REQUEST:
      return { loading: true }
    case STUDENT_DELETE_ALL_SUCCESS:
      toast.success('All students deleted successfully')
      return { loading: false, success: true }
    case STUDENT_DELETE_ALL_FAIL:
      toast.error(action.payload.message || 'Failed to delete all students')
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
