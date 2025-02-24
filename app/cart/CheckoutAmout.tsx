import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
const CheckoutAmount = ({ total, itemsCount }: { total: number; itemsCount: number }) => {
  const shippingCost = 30;
  const finalTotal = total + shippingCost;
  return (
    <Card className="checkout-amount shadow-md rounded-2xl bg-white p-6 w-[270px] h-auto md:w-[350px] flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl  font-semibold text-gray-900">Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 p-0">
        <div className="flex justify-between text-lg">
          <span>Subtotal:</span>
          <span className="font-semibold">{total} EG</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Shipping:</span>
          <span className="font-semibold">{shippingCost} EG</span>
        </div>
        <Separator className="!my-3" />
        <div className="flex justify-between text-xl font-bold text-green-600">
          <span>Total:</span>
          <span>{finalTotal} EG</span>
        </div>
        <div className="flex justify-between text-md text-gray-700">
          <span>Items:</span>
          <span>{itemsCount}</span>
        </div>
        <div className="flex justify-between text-md text-gray-700">
          <span>Delivery:</span>
          <span>Standard (3-5 days)</span>
        </div>
      </CardContent>
      <Button className="font-normal text-md py-5">
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
    </Card>
  );
};

export default CheckoutAmount;
