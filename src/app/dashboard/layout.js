import { Geist } from "next/font/google";

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
        {children}
      </body>
    </html>
  );
}
