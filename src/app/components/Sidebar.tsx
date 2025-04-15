// components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, UserIcon, CogIcon, QuestionMarkCircleIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { FaQuestion } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ]

  const supportItems = [
    { name: 'FAQs', href: '/faqs', icon: <FaQuestion /> },
    { name: 'Contact Us', href: '/contact', icon: <MdOutlineEmail />}
  ]

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col h-full z-20 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          <div className="border-t border-gray-200 mt-28 pt-4 px-4">
            <p className="text-[16px] font-bold text-[#000000] px-3 mb-2">Help & Support</p>
            <div className="space-y-1 mt-4">
              {supportItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >

                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 mt-16 flex gap-2 items-center w-full justify-center px-3 py-2 rounded-lg">
        <IoLogOutOutline className='w-[19px] h-[19px] text-[#BF0202]' />
          <button className="text-[#BF0202]">
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}