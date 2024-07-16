import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminDetails } from '../../actions/adminActions'

const AdminDetails = ({ match }) => {
  const dispatch = useDispatch()
  const { admin, loading, error } = useSelector((state) => state.adminDetails)

  useEffect(() => {
    dispatch(getAdminDetails(match.params.id))
  }, [dispatch, match.params.id])

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Admin Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>Email: {admin.email}</p>
          {/* Display other admin details as needed */}
        </div>
      )}
    </div>
  )
}

export default AdminDetails
