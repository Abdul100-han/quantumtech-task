import { Metadata } from 'next'
import AccountForm from '@/app/components/AccountForm'
import prisma from '@/lib/prisma'

interface EditAccountPageProps {
  params: {
    id: string
  }
}

export default async function EditAccountPage({ params }: EditAccountPageProps) {
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
