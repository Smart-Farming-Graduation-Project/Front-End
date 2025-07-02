"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Crumb from "@/app/components/banner/Crumb";
import img_about from "../assets/images/landing.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "../utils/redux/store/store";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../utils/api/base";
import { getTokenClient } from "../utils/api/getTokenClient";
import toast from "react-hot-toast";

export default function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const discount = parseFloat(searchParams.get("discount") || "0");
  const coupon = searchParams.get("coupon") || "";

  const carts = useSelector((state: RootState) => state.carts.carts);
  const [shippingAddress, setShippingAddress] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const total = carts.reduce((acc, product) => acc + product.productPrice * product.quantity, 0);
  const shippingCost = 30;
  const finalTotal = total + shippingCost - discount;
  const itemsCount = carts.length;

  const handlePlaceOrder = async () => {
    if (!shippingAddress.trim()) {
      toast.error("Please enter your shipping address");
      return;
    }

    if (carts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const token = getTokenClient();
      if (!token) {
        toast.error("Please login to place an order");
        router.push("/signin");
        return;
      }

      // Prepare order items from cart
      const orderItems = carts.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        cupon: coupon || null,
      }));

      const orderData = {
        shippingAddress: shippingAddress.trim(),
        orderItems: orderItems,
      };

      const response = await axios.post(`${API_BASE_URL}/Order/Create`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.succeeded) {
        // Navigate to success page with order details
        router.push(`/order-success?orderId=${response.data.data.orderId}&total=${finalTotal.toFixed(2)}&items=${itemsCount}&address=${encodeURIComponent(shippingAddress)}`);
      } else {
        toast.error(response.data.message || "Failed to place order");
      }
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div>
      <Crumb crumb={img_about} />
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto py-8 px-4 my-10">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">Shipping Information</CardTitle>
              <CardDescription>Enter your shipping details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="shippingAddress">Shipping Address *</Label>
                <Input id="shippingAddress" placeholder="Enter your full shipping address" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">Payment</CardTitle>
              <CardDescription>Enter your payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="4111 1111 1111 1111" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiration">Expiration</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select>
                      <SelectTrigger id="expiration-month">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger id="expiration-year">
                        <SelectValue placeholder="YY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i + 2023} value={(i + 2023).toString()}>
                            {i + 2023}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input id="cardholderName" placeholder="John Doe" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Options</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <CreditCardIcon className="mb-3 h-6 w-6" />
                    Credit Card
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="digital-wallet" id="digital-wallet" className="peer sr-only" />
                  <Label
                    htmlFor="digital-wallet"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <WalletCardsIcon className="mb-3 h-6 w-6" />
                    Digital Wallet
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="other" id="other" className="peer sr-only" />
                  <Label
                    htmlFor="other"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <DollarSignIcon className="mb-3 h-6 w-6" />
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="">
              <CardTitle className="text-2xl font-semibold text-gray-900">Order Summary</CardTitle>
              <CardDescription>Review your order details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {coupon && (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="text-green">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                          <circle cx="12" cy="12" r="4"></circle>
                        </svg>
                      </div>
                      <span className="font-medium">Coupon: {coupon}</span>
                    </div>
                    <span className="text-green font-medium">-{discount.toFixed(2)} EG</span>
                  </div>
                </div>
              )}

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
          </Card>

          <Button size="lg" className="w-full" onClick={handlePlaceOrder} disabled={isPlacingOrder || !shippingAddress.trim()}>
            {isPlacingOrder ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function WalletCardsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
      <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
    </svg>
  );
}
