'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const SiderbarDasshboard = () => {
  const pathname = usePathname()

  const menuItems = [
    { name: 'Phòng nghỉ  ', path: '/dashboard' },
    { name: 'Đơn Phòng nghỉ ', path: '/dashboard/booking' },
    { name: 'Phản hồi của khách ', path: '/dashboard/restaurant' },
    { name: 'Đơn nhà hàng', path: '/dashboard/customers' },
    { name: 'Phòng họp', path: '/dashboard/reports' },
    { name: 'đơn phòng họp', path: '/dashboard/settings' }
  ]

  return (
    <div>
      <aside className="w-64 h-full bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>
                  <div className={`p-3 rounded cursor-pointer transition ${
                    pathname === item.path 
                    ? 'bg-amber-500 text-white' 
                    : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}>
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}

export default SiderbarDasshboard
