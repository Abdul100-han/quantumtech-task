// import { AccountForm } from '@/components/AccountForm'

import { AccountForm } from "@/app/components/AccountForm"

async function getAccount(id: string) {
  const res = await fetch(`http://localhost:3000/api/accounts/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch account')
  }
  return res.json()
}

export default async function EditAccount({ params }: { params: { id: string } }) {
  const account = await getAccount(params.id)

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Account</h1>
      <AccountForm initialData={account} />
    </main>
  )
}