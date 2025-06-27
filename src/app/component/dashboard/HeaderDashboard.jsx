import React from 'react'

const HeaderDashboard = () => {
  return (
    <div>
        <header className="bg-gray-800 text-white dark:bg-gray-950 px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Hotel Management</h1>
            <div className="flex items-center gap-4">
             
              <button className="bg-red-500 dark:bg-red-600 px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-700 transition text-white">
                Logout
              </button>
            </div>
          </header>
    </div>
  )
}

export default HeaderDashboard