import { notFound } from 'next/navigation'
// import AccountForm from '@/components/AccountForm'
import  prisma  from '@/lib/prisma'
import AccountForm from '@/app/components/AccountForm'

export default async function EditAccountPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const account = await prisma.account.findUnique({
    where: { id: params.id }
  })

  if (!account) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Edit Account Holder</h1>
          <p className="text-gray-600">Update the details below</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <AccountForm initialData={account} />
      </div>
    </div>
  )
}