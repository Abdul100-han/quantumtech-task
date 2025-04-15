'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Account {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
}

export const AccountList = () => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/accounts')
        const data = await response.json()
        setAccounts(data)
      } catch (error) {
        console.error('Error fetching accounts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/accounts/${id}`, {
        method: 'DELETE',
      })
      setAccounts(accounts.filter(account => account.id !== id))
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Accounts</h2>
        <Link href="/create" className="px-4 py-2 bg-green-500 text-white rounded-md">
          Create New
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.firstName} {account.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.phone || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link href={`/edit/${account.id}`} className="text-blue-500 hover:text-blue-700">
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(account.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}