import React from 'react'
import { TrashIcon } from '@heroicons/react/outline'

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
  studentName,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 rounded-lg bg-white p-8">
        <p className="mb-4 text-lg">
          Are you sure you want to delete {studentName}?
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              onDelete()
              onClose()
            }}
            className="mr-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
