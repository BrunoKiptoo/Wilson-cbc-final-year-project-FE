import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../actions/adminActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import registrationImage from '../../assets/cbc2.jpg'

function AdminRegistration() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await dispatch(register(username, email, password))
    } catch (error) {
      console.error('Registration Error:', error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <form onSubmit={submitHandler} className="flex w-full p-8 md:w-1/2">
          <div className="flex w-full flex-col justify-center space-y-6">
            <h2 className="mb-6 text-center text-3xl font-bold text-green-700">
              Admin Registration
            </h2>
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
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Register
              </button>
            </div>
          </div>
        </form>
        <div className="hidden md:flex md:w-1/2">
          <img
            src={registrationImage}
            alt="Registration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default AdminRegistration
