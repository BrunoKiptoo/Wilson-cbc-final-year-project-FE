import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listAdmins } from '../../actions/adminActions'

const AdminList = () => {
  const dispatch = useDispatch()
  const { admins, loading, error } = useSelector((state) => state.adminList)

  useEffect(() => {
    dispatch(listAdmins())
  }, [dispatch])

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Admin List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {admins.map((admin) => (
            <li key={admin._id}>
              {admin.email} {/* Example: Display admin email */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AdminList
