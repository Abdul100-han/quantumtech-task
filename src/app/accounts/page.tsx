// import AccountCard from '@/components/AccountCard'
import Link from 'next/link'
import  prisma  from '@/lib/prisma'
import AccountCard from '../components/AccountCard'

export default async function AccountsPage() {
  const accounts = await prisma.account.findMany()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Account Holders</h1>
          <p className="text-gray-600">Manage all account holders</p>
        </div>
        <Link
          href="/accounts/new"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full transition"
        >
          Add Account Holder
        </Link>
      </div>

      {/* Accounts List */}
      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">No account holders found</p>
        </div>
      )}
    </div>
  )
}