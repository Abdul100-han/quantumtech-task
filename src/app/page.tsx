import Link from 'next/link'
import {UserIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  const user = { firstName: 'Nike' }

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold">Hi {user.firstName}</h1>
        <p className="text-gray-600">Good morning, here is all the accounts added to date</p>
      </div>

      {/* Main Content */}
      <div className='border-8 h-full border-gray-200 p-12'>
        <h1 className='text-black font-bold text-[20px]'>Dashboard</h1>
      <div className="flex flex-col items-center justify-center py-6">
        <div className="bg-gray-100 p-6 rounded-lg w-full max-w-md text-center">
        
        <div className="flex items-center justify-center mx-auto h-24 w-24 bg-[#E4F4DC] rounded-full mb-4">
  <UserIcon className="text-[#19A752] w-[36px] h-[36px]" />
</div>

       
          <p className="text-[#211F1F] font-bold text-[20px] mb-6 ">No account holder added</p>
          <p className='text-[#434343] text-[14px]'> You’re yet to add an account holder. Adding an account would give you access to adding various valuable assets for each holder</p>
          <Link
            href="/accounts/new"
            className="inline-block mt-4 bg-[#19A752] hover:bg-green-700 text-white py-2 px-6 rounded-[14px] transition"
          >
            Add an Account Holder
          </Link>
        </div>
      </div>
      </div>

      {/* Mobile Form Preview (hidden on desktop) */}
      <div className="lg:hidden bg-white p-6 rounded-lg shadow-md max-w-xs mx-auto">
        <div className="space-y-4">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gray-200 rounded-full mb-2"></div>
            <p className="text-sm text-gray-500">Choose an image or drag</p>
          </div>
          
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Occupation</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>Select occupation</option>
                <option>Developer</option>
                <option>Designer</option>
              </select>
            </div>
          </div>
          
          <button 
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-md opacity-50 cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}