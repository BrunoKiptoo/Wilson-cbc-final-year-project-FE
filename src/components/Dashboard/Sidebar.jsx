import React from 'react'

const Sidebar = ({ setActiveComponent }) => {
  return (
    <aside className="z-20 h-full w-64 flex-shrink-0 overflow-y-auto bg-white shadow-lg">
      <div className="py-4 text-gray-500">
        <div className="ml-6 text-lg font-bold text-green-800">DASHBOARD</div>
        <ul className="mt-6">
          <li className="relative px-6 py-3">
            <button
              onClick={() => setActiveComponent('students')}
              className="inline-flex w-full items-center rounded-md bg-green-200 p-2 text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-green-800 focus:outline-none"
            >
              <svg
                className="h-5 w-5 text-green-800"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 6V4a2 2 0 00-2-2H4a2 2 0 00-2 2v2M8 10V8a2 2 0 00-2-2H4a2 2 0 00-2 2v2m8 4v-2a2 2 0 00-2-2H4a2 2 0 00-2 2v2m8 4v-2a2 2 0 00-2-2H4a2 2 0 00-2 2v2m16-8V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v8m0 4v-4a2 2 0 00-2-2H4a2 2 0 00-2 2v4m16-8V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v8m0 4v-4a2 2 0 00-2-2H4a2 2 0 00-2 2v4"></path>
              </svg>
              <span className="ml-4 text-green-800">Students</span>
            </button>
          </li>
          <li className="relative px-6 py-3">
            <button
              onClick={() => setActiveComponent('newStudent')}
              className="inline-flex w-full items-center rounded-md bg-green-200 p-2 text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-green-800 focus:outline-none"
            >
              <svg
                className="h-5 w-5 text-green-800"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span className="ml-4 text-green-800">New Student</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
