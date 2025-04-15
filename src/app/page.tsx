import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const user = { firstName: "Nike" };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Hi {user.firstName}</h1>
        <p className="text-gray-600">
          Good morning, here is all the accounts added to date
        </p>
      </div>

      {/* Main Content */}
      <div className="border-8 h-full border-gray-100 p-12">
        <h1 className="text-black font-bold text-[20px]">Dashboard</h1>
        <div className="w-full border border-[#DDE6F0] mt-4"></div>
        <div className="flex flex-col items-center justify-center py-6">
          <div className=" p-6 rounded-lg w-full max-w-md text-center">
            <div className="flex items-center justify-center mx-auto h-24 w-24 bg-[#E4F4DC] rounded-full mb-4">
              <UserIcon className="text-[#19A752] w-[36px] h-[36px]" />
            </div>

            <p className="text-[#211F1F] font-bold text-[20px] mb-6 ">
              No account holder added
            </p>
            <p className="text-[#434343] text-[14px]">
              {" "}
              You’re yet to add an account holder. Adding an account would give
              you access to adding various valuable assets for each holder
            </p>
            <Link
              href="/accounts/new"
              className="inline-block mt-4 bg-[#19A752] hover:bg-green-700 text-white py-[17px] px-[40px] font-light rounded-[14px] transition"
            >
              Add an account holder
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}
