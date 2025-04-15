'use client'

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const user = {
  firstName: 'Nike',
  lastName: 'Adesanoye',
  email: 'nike@example.com',
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <Header
        user={user}
        isMobileMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex pt-4">
        <Sidebar isOpen={isMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </>
  )
}
