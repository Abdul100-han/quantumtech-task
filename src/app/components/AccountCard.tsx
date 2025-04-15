'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

export default function AccountCard({ account }: { account: any }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this account?')
    if (!confirmed) return

    try {
      setIsDeleting(true)
      const res = await fetch(`/api/accounts/${account.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh() // Refresh the page to reflect changes
      } else {
        alert('Failed to delete account')
      }
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
      <div className="font-bold text-lg">
        {account.firstName} {account.lastName}
      </div>
      <div className="text-gray-600">{account.email}</div>
      <div className="flex gap-3 pt-2">
        <Link
          href={`/accounts/${account.id}/edit`}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 hover:underline text-sm"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}
