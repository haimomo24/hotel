import { Geist } from "next/font/google";
import HeaderDashboard from "../component/dashboard/HeaderDashboard";
import SiderbarDasshboard from "../component/dashboard/SiderbarDasshboard";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: 'Dashboard',
  description: 'Hotel Management Dashboard',
}

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className}`}>
        <div className="min-h-screen flex flex-col">
          <HeaderDashboard />
          <div className="flex h-full flex-1">
            <SiderbarDasshboard />
            <main className="flex-1 p-6 bg-gray-50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
