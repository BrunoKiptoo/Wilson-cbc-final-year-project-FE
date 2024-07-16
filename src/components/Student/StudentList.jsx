import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  listStudents,
  deleteStudent,
  updateStudent,
  searchStudents,
} from '../../actions/studentActions'
import { useNavigate } from 'react-router-dom'
import {
  PencilIcon,
  SaveIcon,
  TrashIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import { toast } from 'react-toastify'

const StudentList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const studentList = useSelector((state) => state.studentList)
  const { loading, error, students, currentPage, totalPages } = studentList

  const studentDelete = useSelector((state) => state.studentDelete)
  const { success: deleteSuccess, error: deleteError } = studentDelete

  const studentUpdate = useSelector((state) => state.studentUpdate)
  const {
    success: updateSuccess,
    error: updateError,
    student: updatedStudent,
  } = studentUpdate

  const [searchParams, setSearchParams] = useState({
    firstName: '',
    lastName: '',
    teacher: '',
    grade: '',
  })

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  })

  useEffect(() => {
    dispatch(listStudents(pagination.page, pagination.limit))
  }, [dispatch, pagination.page, pagination.limit])

  const handleNextPage = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    })
  }

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination({
        ...pagination,
        page: pagination.page - 1,
      })
    }
  }

  // useEffect(() => {
  //   dispatch(listStudents());
  // }, [dispatch]);

  const [editableStudentId, setEditableStudentId] = useState(null)
  const [editableStudentData, setEditableStudentData] = useState({})
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingStudentId, setDeletingStudentId] = useState(null)

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Student deleted successfully')
      dispatch(listStudents())
    }
  }, [deleteSuccess, dispatch])

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError)
    }
  }, [deleteError])

  useEffect(() => {
    if (updateSuccess) {
      toast.success('Student updated successfully')
      dispatch(listStudents())
      setEditableStudentId(null)
      setEditableStudentData({})
    }
  }, [updateSuccess, dispatch])

  useEffect(() => {
    if (updateError) {
      toast.error(updateError)
    }
  }, [updateError])

  const editStudent = (studentId, studentData) => {
    setEditableStudentId(studentId)
    setEditableStudentData(studentData)
  }

  const saveStudent = async (studentId) => {
    try {
      await dispatch(updateStudent(studentId, editableStudentData))
    } catch (error) {
      toast.error('Failed to update student. Please try again.')
    }
  }

  const confirmDelete = (studentId) => {
    setDeletingStudentId(studentId)
    setDeleteModalOpen(true)
  }

  const handleDelete = () => {
    dispatch(deleteStudent(deletingStudentId))
    setDeleteModalOpen(false)
  }

  const handleInputChange = (e, field, assessmentId) => {
    if (field.startsWith('assessments')) {
      const updatedAssessments = editableStudentData.assessments.map((a) => {
        if (a._id === assessmentId) {
          return {
            ...a,
            [field.split('.').pop()]: e.target.value,
          }
        }
        return a
      })
      setEditableStudentData({
        ...editableStudentData,
        assessments: updatedAssessments,
      })
    } else {
      setEditableStudentData({
        ...editableStudentData,
        [field]: e.target.value,
      })
    }
  }

  const handleCompetencyInputChange = (e, field, competencyKey) => {
    const updatedCompetencies = {
      ...editableStudentData.competencies,
      [competencyKey]: {
        ...editableStudentData.competencies[competencyKey],
        [field.split('.').pop()]: e.target.value,
      },
    }

    setEditableStudentData({
      ...editableStudentData,
      competencies: updatedCompetencies,
    })
  }

  const handleSearchInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    })
  }

  const handleSearch = () => {
    dispatch(searchStudents(searchParams))
  }

  useEffect(() => {
    dispatch(listStudents())
  }, [dispatch])

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center rounded-lg bg-green-100 p-4 shadow-md">
        <input
          type="text"
          name="firstName"
          placeholder="Search by first name..."
          value={searchParams.firstName}
          onChange={handleSearchInputChange}
          className="rounded-lg border border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Search by last name..."
          value={searchParams.lastName}
          onChange={handleSearchInputChange}
          className="ml-2 rounded-lg border border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="teacher"
          placeholder="Search by teacher..."
          value={searchParams.teacher}
          onChange={handleSearchInputChange}
          className="ml-2 rounded-lg border border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="grade"
          placeholder="Search by grade..."
          value={searchParams.grade}
          onChange={handleSearchInputChange}
          className="ml-2 rounded-lg border border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="ml-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-green-600 focus:outline-none"
        >
          <SearchIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : Array.isArray(students) && students.length > 0 ? (
        <div>
          {students.map((student) => (
            <div
              key={student._id}
              className="relative mb-4 rounded-lg border border-green-300 bg-green-50 p-6 shadow-lg"
            >
              <button
                onClick={() => confirmDelete(student._id)}
                className="absolute right-4 top-4 text-red-600 hover:text-red-900"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <h3 className="text-xl font-semibold text-green-800">
                {student.firstName} {student.lastName}
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-green-200">
                  <tbody className="divide-y divide-green-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-green-900">
                        Grade
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-green-500">
                        {editableStudentId === student._id ? (
                          <input
                            type="text"
                            value={editableStudentData.grade}
                            onChange={(e) => handleInputChange(e, 'grade')}
                            className="rounded-lg border border-green-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        ) : (
                          student.grade
                        )}
                        {editableStudentId === student._id ? (
                          <button
                            onClick={() => saveStudent(student._id)}
                            className="ml-2 text-green-600 hover:text-green-900"
                          >
                            <SaveIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        ) : (
                          <button
                            onClick={() => editStudent(student._id, student)}
                            className="ml-2 text-green-600 hover:text-green-900"
                          >
                            <PencilIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-green-900">
                        Class Teacher
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-green-500">
                        {editableStudentId === student._id ? (
                          <input
                            type="text"
                            value={editableStudentData.classTeacher}
                            onChange={(e) =>
                              handleInputChange(e, 'classTeacher')
                            }
                            className="rounded-lg border border-green-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        ) : (
                          student.classTeacher
                        )}
                        {editableStudentId === student._id ? (
                          <button
                            onClick={() => saveStudent(student._id)}
                            className="ml-2 text-green-600 hover:text-green-900"
                          >
                            <SaveIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        ) : (
                          <button
                            onClick={() => editStudent(student._id, student)}
                            className="ml-2 text-green-600 hover:text-green-900"
                          >
                            <PencilIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        )}
                      </td>
                    </tr>
                    {/* Add similar sections for other editable fields */}
                  </tbody>
                </table>
              </div>

              {student.assessments.map((assessment) => (
                <div
                  key={assessment._id}
                  className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm"
                >
                  <div className="flex-grow text-sm text-green-800">
                    <p>
                      <strong>Formative:</strong>{' '}
                      {editableStudentId === student._id ? (
                        <select
                          value={
                            editableStudentData.assessments.find(
                              (a) => a._id === assessment._id
                            )?.formative || ''
                          }
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              `assessments.${assessment._id}.formative`,
                              assessment._id
                            )
                          }
                          className="rounded-lg border border-green-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="B+">B+</option>
                          <option value="B">B</option>
                          <option value="C+">C+</option>
                          <option value="C">C</option>
                          <option value="D+">D+</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                        </select>
                      ) : (
                        assessment.formative
                      )}
                    </p>
                    <p>
                      <strong>Summative:</strong>{' '}
                      {editableStudentId === student._id ? (
                        <select
                          value={
                            editableStudentData.assessments.find(
                              (a) => a._id === assessment._id
                            )?.summative || ''
                          }
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              `assessments.${assessment._id}.summative`,
                              assessment._id
                            )
                          }
                          className="rounded-lg border border-green-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="B+">B+</option>
                          <option value="B">B</option>
                          <option value="C+">C+</option>
                          <option value="C">C</option>
                          <option value="D+">D+</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                        </select>
                      ) : (
                        assessment.summative
                      )}
                    </p>
                  </div>
                  {editableStudentId === student._id ? (
                    <button
                      onClick={() => saveStudent(student._id)}
                      className="ml-2 text-green-600 hover:text-green-900"
                    >
                      <SaveIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      onClick={() => editStudent(student._id, student)}
                      className="ml-2 text-green-600 hover:text-green-900"
                    >
                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              ))}

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-green-700">
                  Competencies
                </h4>
                <div className="mt-2 overflow-x-auto">
                  <table className="min-w-full divide-y divide-green-200">
                    <thead className="bg-green-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase text-green-500"
                        >
                          Competency
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase text-green-500"
                        >
                          Score
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase text-green-500"
                        >
                          Teacher
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-green-200 bg-white">
                      {Object.keys(student.competencies).map((key) => (
                        <tr key={key}>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-green-900">
                            {key}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-green-500">
                            {editableStudentId === student._id ? (
                              <input
                                type="text"
                                value={
                                  editableStudentData.competencies[key]
                                    ?.score || ''
                                }
                                onChange={(e) =>
                                  handleCompetencyInputChange(
                                    e,
                                    `competencies.${key}.score`,
                                    key
                                  )
                                }
                                className="rounded-lg border border-green-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                            ) : (
                              student.competencies[key]?.score || ''
                            )}
                            {editableStudentId === student._id ? (
                              <button
                                onClick={() => saveStudent(student._id)}
                                className="ml-2 text-green-600 hover:text-green-900"
                              >
                                <SaveIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  editStudent(student._id, student)
                                }
                                className="ml-2 text-green-600 hover:text-green-900"
                              >
                                <PencilIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-green-500">
                            {editableStudentId === student._id ? (
                              <input
                                type="text"
                                value={
                                  editableStudentData.competencies[key]
                                    ?.teacher || ''
                                }
                                onChange={(e) =>
                                  handleCompetencyInputChange(
                                    e,
                                    `competencies.${key}.teacher`,
                                    key
                                  )
                                }
                                className="rounded-lg border border-green-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                            ) : (
                              student.competencies[key]?.teacher || ''
                            )}
                            {editableStudentId === student._id ? (
                              <button
                                onClick={() => saveStudent(student._id)}
                                className="ml-2 text-green-600 hover:text-green-900"
                              >
                                <SaveIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  editStudent(student._id, student)
                                }
                                className="ml-2 text-green-600 hover:text-green-900"
                              >
                                <PencilIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`rounded-l-md bg-green-200 px-4 py-2 text-green-600 hover:bg-green-300 focus:outline-none ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`rounded-r-md bg-green-200 px-4 py-2 text-green-600 hover:bg-green-300 focus:outline-none ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <p>No students found.</p>
      )}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        studentName={
          students?.find((student) => student._id === deletingStudentId)
            ?.firstName || ''
        }
      />
    </div>
  )
}

export default StudentList
