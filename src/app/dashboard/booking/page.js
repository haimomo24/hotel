import React from 'react'
import Link from 'next/link'
import { getDbPool } from '@/lib/db'
import DeleteBookingButton from '@/app/component/dashboard/DeleteBookingButton'
import sql from 'mssql'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function Page(props) {
  /* ---------- 1. Lấy searchParams ---------- */
  const searchParams = props.searchParams || {}

  /* ---------- 2. Phân trang ---------- */
  const currentPage = Math.max(1, parseInt(searchParams.page, 10) || 1)
  const limit = 10
  const offset = (currentPage - 1) * limit

  /* ---------- 3. Bộ lọc tháng–năm và ngày ---------- */
  const monthYear = searchParams.monthYear || '' // "2025-07"
  const selectedDateStr = searchParams.selectedDate || '' // "2025-07-15"
  let filterMonth = null, filterYear = null, filterDate = null

  if (selectedDateStr) {
    filterDate = new Date(selectedDateStr)
  } else if (monthYear) {
    const [y, m] = monthYear.split('-')
    filterYear = parseInt(y, 10)
    filterMonth = parseInt(m, 10)
  }

  /* ---------- 4. Truy vấn DB ---------- */
  const pool = await getDbPool()
  const [dataResult, countResult] = await Promise.all([
    pool
      .request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .input('filterMonth', sql.Int, filterMonth)
      .input('filterYear', sql.Int, filterYear)
      .input('filterDate', sql.Date, filterDate)
      .query(`
        SELECT
          b.booking_id      AS id,
          r.room_no         AS room_no,
          rt.type_name      AS roomType,
          b.customer_name   AS customerName,
          b.customer_email  AS customerEmail,
          b.customer_phone  AS customerPhone,
          b.adult_count     AS adultCount,
          b.child_count     AS childCount,
          b.check_in        AS checkIn,
          b.check_out       AS checkOut,
          b.total_price     AS totalPrice
        FROM dbo.bookings b
        JOIN dbo.rooms      r  ON b.room_id = r.room_id
        JOIN dbo.room_types rt ON r.type_id = rt.type_id
        WHERE (@filterDate  IS NULL OR CAST(b.check_in AS DATE) = @filterDate)
          AND (@filterMonth IS NULL OR MONTH(b.check_in)        = @filterMonth)
          AND (@filterYear  IS NULL OR YEAR (b.check_in)        = @filterYear)
        ORDER BY b.booking_id DESC
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
      `),

    pool
      .request()
      .input('filterMonth', sql.Int, filterMonth)
      .input('filterYear', sql.Int, filterYear)
      .input('filterDate', sql.Date, filterDate)
      .query(`
        SELECT COUNT(*) AS count
        FROM dbo.bookings b
        WHERE (@filterDate  IS NULL OR CAST(b.check_in AS DATE) = @filterDate)
          AND (@filterMonth IS NULL OR MONTH(b.check_in)        = @filterMonth)
          AND (@filterYear  IS NULL OR YEAR (b.check_in)        = @filterYear);
      `)
  ])

  const bookings = dataResult.recordset
  const totalCount = countResult.recordset[0].count
  const totalPages = Math.ceil(totalCount / limit)

  /* ---------- 5. Hàm dựng query giữ bộ lọc ---------- */
  const buildQueryString = (page) => {
    const params = new URLSearchParams()
    params.set('page', page)
    if (monthYear) params.set('monthYear', monthYear)
    if (selectedDateStr) params.set('selectedDate', selectedDateStr)
    return `?${params.toString()}`
  }

  /* ---------- 6. Giao diện ---------- */
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* ===== TIÊU ĐỀ & FORM LỌC ===== */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Danh sách Booking
        </h1>

        <form method="GET" className="flex flex-wrap items-center gap-3">
          <input
            type="month"
            name="monthYear"
            defaultValue={monthYear}
            className="border rounded px-3 py-2"
          />

          <input
            type="date"
            name="selectedDate"
            defaultValue={selectedDateStr}
            className="border rounded px-3 py-2"
          />

          <input type="hidden" name="page" value="1" />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Lọc
          </button>

          {(monthYear || selectedDateStr) && (
            <Link
              href="?page=1"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Reset
            </Link>
          )}
        </form>
      </div>

      {/* ===== BẢNG DỮ LIỆU ===== */}
      {bookings.length === 0 ? (
        <p className="text-gray-600">Không có booking nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Phòng</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Loại phòng</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Tên khách</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Phone</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Check In</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Check Out</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Người lớn</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Trẻ em</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Giá</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, idx) => (
                <tr key={b.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm text-gray-800">{b.room_no}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{b.roomType}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{b.customerName}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{b.customerEmail}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{b.customerPhone}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {new Date(b.checkIn).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {new Date(b.checkOut).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{b.adultCount}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{b.childCount}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {b.totalPrice.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <DeleteBookingButton bookingId={b.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== PHÂN TRANG ===== */}
      {totalPages > 1 && (
        <nav className="mt-6 flex justify-center items-center space-x-2">
          {currentPage > 1 ? (
            <Link
              href={buildQueryString(currentPage - 1)}
              className="px-3 py-1 border rounded hover:bg-gray-200"
            >
              Prev
            </Link>
          ) : (
            <span className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed">
              Prev
            </span>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildQueryString(p)}
              className={`px-3 py-1 border rounded ${
                p === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              {p}
            </Link>
          ))}

          {currentPage < totalPages ? (
            <Link
              href={buildQueryString(currentPage + 1)}
              className="px-3 py-1 border rounded hover:bg-gray-200"
            >
              Next
            </Link>
          ) : (
            <span className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed">
              next
            </span>
          )}
        </nav>
      )}
    </div>
  )
}
