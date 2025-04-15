import AccountForm from '@/app/components/AccountForm'
import prisma from '@/lib/prisma'

export default async function EditAccountPage({ params }: { params: { id: string } }) {
  const account = await prisma.account.findUnique({
    where: { id: params.id },
  })

  if (!account) return <div>Account not found</div>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Edit Account</h1>
          <p className="text-gray-600">Update the details below.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <AccountForm initialData={account} />
      </div>
    </div>
  )
}
