'use client'

import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface HeaderProps {
  user: {
    firstName: string
    lastName: string
    email: string
  }
  onMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export default function Header({ user, onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and Menu Toggle */}
        <div className="flex items-center space-x-4">
          <button 
            className="lg:hidden p-2 rounded-md text-gray-700"
            onClick={onMenuToggle}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <h1 className="text-xl italic font-bold text-[#19A752]">Life <span className='text-black'>time</span> </h1>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative bg-[#DDE6F0] rounded-full p-1">
            <BellIcon className="h-6 w-6 text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </div>
          <div className='h-[40px] border text-[#D4D4D4]'></div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#DDE6F0] flex items-center justify-center text-[#211F1F] font-bold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="hidden md:block">
              <p className="font-medium text-[#211F1F]">{user.firstName} {user.lastName}</p>
              {/* <p className="text-xs text-gray-500">{user.email}</p>/ */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}