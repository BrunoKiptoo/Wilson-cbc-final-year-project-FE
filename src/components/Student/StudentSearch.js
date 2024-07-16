import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchStudents } from '../../actions/studentActions'

const StudentSearch = () => {
  const dispatch = useDispatch()
  const { students, loading, error } = useSelector(
    (state) => state.studentSearch
  )
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    dispatch(searchStudents(query))
  }

  return (
    <div className="mx-auto mt-8 max-w-sm rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Search Students</h2>
      <input
        type="text"
        placeholder="Search by name"
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
            {students.map((student) => (
              <li key={student._id}>
                {student.firstName} {student.lastName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default StudentSearch
