'use client'

import React, { Suspense } from 'react'
import BookingContent from '../component/BookingContent'


export default function BookingPageWrapper() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Đang tải...</div>}>
      <BookingContent />
    </Suspense>
  )
}
