import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createStudent } from '../../actions/studentActions'
import { STUDENT_CREATE_REQUEST } from '../../constants/studentConstants'

const grades = [
  'A+',
  'A',
  'A-',
  'B+',
  'B',
  'B-',
  'C+',
  'C',
  'C-',
  'D+',
  'D',
  'D-',
  'E',
]

const NewStudentForm = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    grade: '',
    classTeacher: '',
    assessments: [{ formative: '', summative: '' }],
    competencies: {
      communicationAndCollaboration: { score: '', teacher: '' },
      criticalThinkingAndProblemSolving: { score: '', teacher: '' },
      imaginationAndCreativity: { score: '', teacher: '' },
      citizenship: { score: '', teacher: '' },
      learningToLearn: { score: '', teacher: '' },
      selfEfficacy: { score: '', teacher: '' },
      digitalLiteracy: { score: '', teacher: '' },
    },
    parents: [{ name: '', phoneNumber: '' }],
  })

  const { loading, success, error } = useSelector(
    (state) => state.studentCreate
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('assessments')) {
      const index = parseInt(name.split('.')[1])
      const updatedAssessments = [...formData.assessments]
      updatedAssessments[index] = {
        ...updatedAssessments[index],
        [name.split('.')[2]]: value,
      }
      setFormData({ ...formData, assessments: updatedAssessments })
    } else if (name.startsWith('competencies')) {
      const competencyName = name.split('.')[1]
      setFormData({
        ...formData,
        competencies: {
          ...formData.competencies,
          [competencyName]: {
            ...formData.competencies[competencyName],
            [name.split('.')[2]]: value,
          },
        },
      })
    } else if (name.startsWith('parents')) {
      const index = parseInt(name.split('.')[1])
      const updatedParents = [...formData.parents]
      updatedParents[index] = {
        ...updatedParents[index],
        [name.split('.')[2]]: value,
      }
      setFormData({ ...formData, parents: updatedParents })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: STUDENT_CREATE_REQUEST })
    dispatch(createStudent(formData))
      .then((res) => {
        if (success) {
          setFormData({
            firstName: '',
            lastName: '',
            grade: '',
            classTeacher: '',
            assessments: [{ formative: '', summative: '' }],
            competencies: {
              communicationAndCollaboration: { score: '', teacher: '' },
              criticalThinkingAndProblemSolving: { score: '', teacher: '' },
              imaginationAndCreativity: { score: '', teacher: '' },
              citizenship: { score: '', teacher: '' },
              learningToLearn: { score: '', teacher: '' },
              selfEfficacy: { score: '', teacher: '' },
              digitalLiteracy: { score: '', teacher: '' },
            },
            parents: [{ name: '', phoneNumber: '' }],
          })
        }
      })
      .catch((err) => {
        if (error) {
          toast.error(`Error: ${error}`)
        }
      })
  }

  return (
    <div className="mx-auto mb-10 mt-10 max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Left Section: Required Fields */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Grade
            </label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Class Teacher
            </label>
            <input
              type="text"
              name="classTeacher"
              value={formData.classTeacher}
              onChange={handleChange}
              required
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
        </div>
        {/* Right Section: Assessments */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Assessments
            </label>
            {formData.assessments.map((assessment, index) => (
              <div key={index} className="mb-2 flex">
                <select
                  name={`assessments.${index}.formative`}
                  value={assessment.formative}
                  onChange={handleChange}
                  className="focus:shadow-outline mr-2 flex-1 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                >
                  {grades.map((grade, gIndex) => (
                    <option key={gIndex} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                <select
                  name={`assessments.${index}.summative`}
                  value={assessment.summative}
                  onChange={handleChange}
                  className="focus:shadow-outline flex-1 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                >
                  {grades.map((grade, gIndex) => (
                    <option key={gIndex} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom Section: Competencies and Parents */}
        <div className="col-span-2">
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Competencies
            </label>
            {Object.keys(formData.competencies).map((key, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  type="text"
                  name={`competencies.${key}.score`}
                  value={formData.competencies[key].score}
                  onChange={handleChange}
                  placeholder={`${key} Score`}
                  className="focus:shadow-outline mr-2 flex-1 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <input
                  type="text"
                  name={`competencies.${key}.teacher`}
                  value={formData.competencies[key].teacher}
                  onChange={handleChange}
                  placeholder={`${key} Teacher`}
                  className="focus:shadow-outline flex-1 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Parents
            </label>
            {formData.parents.map((parent, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  type="text"
                  name={`parents.${index}.name`}
                  value={parent.name}
                  onChange={handleChange}
                  placeholder="Parent Name"
                  className="focus:shadow-outline mr-2 flex-1 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <input
                  type="text"
                  name={`parents.${index}.phoneNumber`}
                  value={parent.phoneNumber}
                  onChange={handleChange}
                  placeholder="Parent Phone Number"
                  className="focus:shadow-outline flex-1 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
            ))}
          </div>
          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:bg-green-700 focus:outline-none"
            >
              Add Student
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewStudentForm
