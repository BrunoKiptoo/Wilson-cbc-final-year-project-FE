import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/adminActions'
import { useNavigate } from 'react-router-dom'
import loginImage from '../../assets/cbc.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const adminLogin = useSelector((state) => state.adminLogin)
  const { loading, error, adminInfo } = adminLogin

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  useEffect(() => {
    if (adminInfo && adminInfo.data) {
      toast.success('Login successful!')
      navigate('/dashboard')
    }
    if (error) {
      toast.error(error)
    }
  }, [adminInfo, error, navigate])

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="hidden md:flex md:w-1/2">
          <img
            src={loginImage}
            alt="CBC"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
          <h2 className="mb-6 text-center text-3xl font-bold text-green-700">
            Admin Login
          </h2>
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
