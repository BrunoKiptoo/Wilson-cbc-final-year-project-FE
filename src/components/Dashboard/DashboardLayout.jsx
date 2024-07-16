// src/components/DashboardLayout.jsx
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import StudentList from '../Student/StudentList'
import NewStudentForm from '../Student/NewStudentForm'
import UpdateStudentForm from '../Student/UpdateStudentForm'
import DeleteStudent from '../Student/DeleteStudent'
import StudentDetails from '../Student/StudentDetails'

const DashboardLayout = () => {
  const [activeComponent, setActiveComponent] = useState('')
  const [activeStudent, setActiveStudent] = useState(null) // State to manage active student for details or update

  const renderComponent = () => {
    switch (activeComponent) {
      case 'students':
        return (
          <StudentList
            setActiveComponent={setActiveComponent}
            setActiveStudent={setActiveStudent}
          />
        )
      case 'newStudent':
        return <NewStudentForm />
      case 'updateStudent':
        return <UpdateStudentForm student={activeStudent} />
      case 'deleteStudent':
        return <DeleteStudent studentId={activeStudent._id} />
      case 'studentDetails':
        return <StudentDetails student={activeStudent} />
      default:
        return <div>Welcome to your Dashboard</div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex w-full flex-1 flex-col">
        <Navbar />
        <main className="h-full overflow-y-auto">
          <div className="container mx-auto px-6">{renderComponent()}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
