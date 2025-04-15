import prisma  from '@/lib/prisma'

export default async function ProfilePage() {
  // In a real app, you would get the user ID from the session
  const user = await prisma.user.findFirst()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-600">Manage your profile information</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold text-xl">
              {user?.firstName[0]}{user?.lastName[0]}
            </div>
            <div>
              <h2 className="text-lg font-medium">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <p className="mt-1 text-gray-900">{user?.firstName}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <p className="mt-1 text-gray-900">{user?.lastName}</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}