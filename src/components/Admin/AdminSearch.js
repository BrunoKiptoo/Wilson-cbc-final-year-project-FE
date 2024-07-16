import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchAdmins } from '../../actions/adminActions'

const AdminSearch = () => {
  const dispatch = useDispatch()
  const { admins, loading, error } = useSelector((state) => state.adminSearch)
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    dispatch(searchAdmins(query))
  }

  return (
    <div className="mx-auto mt-8 max-w-sm rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Search Admins</h2>
      <input
        type="text"
        placeholder="Search by email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-3 block w-full rounded-md border-gray-300 px-3 py-2"
      />
      <button
        onClick={handleSearch}
        className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
      >
        Search
      </button>
      <div className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {admins.map((admin) => (
              <li key={admin._id}>{admin.email}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AdminSearch
