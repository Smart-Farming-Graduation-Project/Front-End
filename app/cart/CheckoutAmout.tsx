import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../utils/api/base";
import { getTokenClient } from "../utils/api/getTokenClient";
const CheckoutAmount = ({ total, itemsCount }: { total: number; itemsCount: number }) => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const shippingCost = 30;
  const finalTotal = total + shippingCost - discount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    setIsApplying(true);
    try {
      const token = getTokenClient();
      const response = await axios.post(
        `${API_BASE_URL}/Cupon/AssignToProduct`,
        {
          cuponId: couponCode,
          productId: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Coupon response:", response.data);
      if (response.data.statusCode === 200) {
        const discountAmount = response.data.data.discountAmount || total * 0.1;
        setDiscount(discountAmount);
        setAppliedCoupon(couponCode);
        toast.success("Coupon applied successfully!");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Invalid coupon code or coupon cannot be applied");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Card className="checkout-amount shadow-md rounded-2xl bg-white p-6 w-[270px] h-auto md:w-[350px] flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-semibold text-gray-900">Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 p-0">
        <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="text-sm font-medium text-gray-700">Have a coupon?</div>
          <div className="flex gap-2">
            <Input placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="h-9 focus-visible:ring-green" disabled={!!appliedCoupon || isApplying} />
            <Button variant="outline" onClick={handleApplyCoupon} className="h-9 px-3 border-green text-green hover:bg-green-50" disabled={!!appliedCoupon || isApplying || !couponCode}>
              {isApplying ? "Applying..." : "Apply"}
            </Button>
          </div>
          {appliedCoupon && (
            <div className="text-sm text-green flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Coupon "{appliedCoupon}" applied
            </div>
          )}
        </div>

        <div className="flex justify-between text-lg">
          <span>Subtotal:</span>
          <span className="font-semibold">{total.toFixed(2)} EG</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-lg text-green">
            <span>Discount:</span>
            <span className="font-semibold">-{discount.toFixed(2)} EG</span>
          </div>
        )}

        <div className="flex justify-between text-lg">
          <span>Shipping:</span>
          <span className="font-semibold">{shippingCost.toFixed(2)} EG</span>
        </div>

        <Separator className="!my-3" />

        <div className="flex justify-between text-xl font-bold text-green-600">
          <span>Total:</span>
          <span>{finalTotal.toFixed(2)} EG</span>
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
        <Link href={`/checkout?discount=${discount}&coupon=${encodeURIComponent(appliedCoupon || "")}`}>Proceed to Checkout</Link>
      </Button>
    </Card>
  );
};

export default CheckoutAmount;
