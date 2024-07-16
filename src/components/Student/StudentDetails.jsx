// src/components/Student/StudentDetails.jsx

import React from 'react'

const StudentDetails = ({ student }) => {
  console.log('Student Details:', student)

  if (!student) {
    return <p>No student details found.</p>
  }

  const {
    firstName,
    lastName,
    grade,
    classTeacher,
    assessments,
    competencies,
    parents,
  } = student

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800">{`${firstName} ${lastName}'s Details`}</h2>

      <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-md">
        <div className="px-6 py-4">
          <p className="text-gray-700">
            <strong>Grade:</strong> {grade}
          </p>

          <p className="text-gray-700">
            <strong>Class Teacher:</strong> {classTeacher}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Assessments</h3>

            {assessments && assessments.length > 0 ? (
              <ul className="mt-2 list-inside list-disc">
                {assessments.map((assessment) => (
                  <li key={assessment._id}>
                    Formative: {assessment.formative}, Summative:{' '}
                    {assessment.summative}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No assessments found.</p>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Competencies
            </h3>

            <ul className="mt-2 list-inside list-disc">
              {Object.keys(competencies).map((key) => (
                <li key={key}>
                  {key}: Score {competencies[key].score}, Teacher{' '}
                  {competencies[key].teacher}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Parents</h3>

            {parents && parents.length > 0 ? (
              <ul className="mt-2 list-inside list-disc">
                {parents.map((parent) => (
                  <li key={parent._id}>
                    Name: {parent.name}, Phone Number: {parent.phoneNumber}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No parent details found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetails
