import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StudentList from './components/Student/StudentList'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import DashboardLayout from './components/Dashboard/DashboardLayout'
import StudentDetails from './components/Student/StudentDetails'
import UpdateStudentForm from './components/Student/UpdateStudentForm'
import DeleteStudent from './components/Student/DeleteStudent'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminLogin from './components/Admin/AdminLogin'
import AdminRegistration from './components/Admin/AdminRegister'

function App() {
  return (
    <div className="App">
      <div className="container mx-auto px-4">
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/students" element={<StudentList />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/students/edit/:id" element={<UpdateStudentForm />} />
          <Route path="/students/delete/:id" element={<DeleteStudent />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<AdminRegistration />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
