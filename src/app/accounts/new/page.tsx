
import AccountForm from "@/app/components/AccountForm";

export default function NewAccountPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Add an account holder</h1>
          <p className="text-gray-600">Fill the details below in order to add an account holder.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <AccountForm />
      </div>
    </div>
  )
}