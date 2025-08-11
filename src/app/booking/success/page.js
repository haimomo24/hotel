import BookingSuccessClient from "@/app/component/BookingSuccessClient";
import React, { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <BookingSuccessClient />
    </Suspense>
  );
}
