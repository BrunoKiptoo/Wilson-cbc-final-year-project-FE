import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteStudent } from '../../actions/studentActions'

const DeleteStudent = ({ studentId }) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(studentId))
      // Optionally: handle success message or redirect
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-600 focus:outline-none"
    >
      Delete
    </button>
  )
}

export default DeleteStudent
