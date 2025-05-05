"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RouteNames } from "@/constraints/route-name";
import Link from "next/link";

// Helper component for displaying information items
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}

export default function ThanksPage() {
  const [paymentInfo, setPaymentInfo] = useState({
    orderId: "",
    amount: "",
    payType: "",
  });

  useEffect(() => {
    // Get URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Get only the required parameters
    const orderId = searchParams.get("orderId") || "";
    const amount = searchParams.get("amount") || "0";
    const payType = searchParams.get("payType") || "N/A";

    setPaymentInfo({
      orderId: decodeURIComponent(orderId),
      amount: decodeURIComponent(amount),
      payType: decodeURIComponent(payType),
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="pb-4 text-center">
          <div className="mx-auto mb-4 rounded-full bg-success/10 p-4">
            <CheckCircle size={48} className="text-success" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-foreground">
            Cảm ơn bạn đã thanh toán!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3 rounded-lg bg-muted p-4">
            <InfoItem label="Mã đơn hàng" value={paymentInfo.orderId} />
            <InfoItem
              label="Số tiền"
              value={`${new Intl.NumberFormat("vi-VN").format(Number(paymentInfo.amount) || 0)} VND`}
            />
            <InfoItem label="Phương thức" value={paymentInfo.payType} />
          </div>

          <div className="text-center">
            <Button asChild className="w-full">
              <Link href={RouteNames.Home}>Về trang chủ</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
