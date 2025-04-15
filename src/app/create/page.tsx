// import { AccountForm } from '@/components/AccountForm'

import { AccountForm } from "@/app/components/AccountForm";

export default function CreateAccount() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Account</h1>
      <AccountForm />
    </main>
  )
}