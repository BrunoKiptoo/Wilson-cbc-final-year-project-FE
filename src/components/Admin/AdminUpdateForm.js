import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminDetails, updateAdmin } from '../../actions/adminActions'

const AdminUpdateForm = ({ match, history }) => {
  const dispatch = useDispatch()
  const { admin, loading, error } = useSelector((state) => state.adminDetails)
  const [email, setEmail] = useState('')

  useEffect(() => {
    dispatch(getAdminDetails(match.params.id))
  }, [dispatch, match.params.id])

  useEffect(() => {
    if (admin) {
      setEmail(admin.email)
      // Set other fields here if needed
    }
  }, [admin])

  const handleUpdate = () => {
    dispatch(updateAdmin(match.params.id, { email }))
    history.push('/admin/all') // Redirect after update
  }

  return (
    <div className="mx-auto mt-8 max-w-sm rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Update Admin</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 block w-full rounded-md border-gray-300 px-3 py-2"
          />
          <button
            onClick={handleUpdate}
            className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
          >
            Update
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminUpdateForm
