import React from 'react'
import { toast } from 'react-toastify' // Import toast from react-toastify
import { useNavigate } from 'react-router-dom' // Import useNavigate hook
import { useDispatch, useSelector } from 'react-redux' // Import useDispatch and useSelector hooks
import { logout } from '../../actions/adminActions' // Import the logout action
import { ADMIN_LOGOUT } from '../../constants/adminConstants' // Import ADMIN_LOGOUT action type

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  const handleLogout = () => {
    dispatch(logout()) // Dispatch the logout action
    toast.success('Logged out successfully') // Show success toast
    navigate('/') // Navigate to the login page
  }

  return (
    <div className="flex items-center justify-between bg-green-800 p-4 text-white">
      <div>
        <span className="text-lg font-bold">CBC GRADE 3</span>
      </div>
      <div>
        <div className="flex items-center">
          {adminInfo && adminInfo.data && (
            <span className="mr-4 text-sm">
              Hello, {adminInfo.data.username}
            </span>
          )}
          <button
            className="rounded bg-red-600 px-3 py-1 text-white transition duration-200 hover:bg-red-700"
            onClick={handleLogout} // Handle logout on button click
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
