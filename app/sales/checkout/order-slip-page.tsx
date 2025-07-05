"use client";

import OrderSlipPage from "./order-slip";

export default function OrderSlipStandalonePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <OrderSlipPage isModal={false} />
    </div>
  );
} 