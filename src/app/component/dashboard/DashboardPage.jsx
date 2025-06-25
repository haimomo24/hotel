export default function Dashboard() {
  return (
    <html>
      <body className="bg-white dark:bg-gray-900">
        <div className="h-screen flex flex-col">
          {/* Header Dashboard */}
          <header className="bg-gray-800 text-white dark:bg-gray-950 px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Hotel Management</h1>
            <div className="flex items-center gap-4">
             
              <button className="bg-red-500 dark:bg-red-600 px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-700 transition text-white">
                Logout
              </button>
            </div>
          </header>

          <div className="flex flex-1">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              <nav className="p-4">
                <ul className="space-y-2">
                  <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer transition text-gray-800 dark:text-gray-200">
                    Dashboard
                  </li>
                  <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer transition text-gray-800 dark:text-gray-200">
                    Rooms
                  </li>
                  <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer transition text-gray-800 dark:text-gray-200">
                    Bookings
                  </li>
                  <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer transition text-gray-800 dark:text-gray-200">
                    Customers
                  </li>
                  <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer transition text-gray-800 dark:text-gray-200">
                    Reports
                  </li>
                  <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer transition text-gray-800 dark:text-gray-200">
                    Settings
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
              <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
              {/* Thêm nội dung chính ở đây */}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
