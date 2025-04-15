import { Account } from '@prisma/client'

interface AccountCardProps {
  account: Account
}

export default function AccountCard({ account }: AccountCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold">
          {account.firstName[0]}{account.lastName[0]}
        </div>
        <div>
          <h3 className="font-medium">{account.firstName} {account.lastName}</h3>
          <p className="text-sm text-gray-500">{account.email}</p>
        </div>
      </div>
    </div>
  )
}