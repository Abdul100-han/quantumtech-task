import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-100 p-6 rounded-lg w-full max-w-md text-center">
          <div className="mx-auto h-24 w-24 bg-gray-200 rounded-full mb-4"></div>
          <p className="text-gray-500 mb-6">No account holder added</p>
          <Link
            href="/accounts"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition"
          >
            Add an Account Holder
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard