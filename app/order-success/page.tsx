"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Crumb from "@/app/components/banner/Crumb";
import img_about from "../assets/images/landing.jpeg";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/redux/slices/CartSlice";
import { AppDispatch } from "../utils/redux/store/store";
import { CheckCircle, Package, MapPin, CreditCard, Calendar } from "lucide-react";
import Link from "next/link";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  const orderId = searchParams.get("orderId");
  const total = parseFloat(searchParams.get("total") || "0");
  const items = parseInt(searchParams.get("items") || "0");
  const address = searchParams.get("address");

  useEffect(() => {
    // Clear the cart after successful order
    dispatch(clearCart());
    setIsLoading(false);

    // If no order data, redirect to home
    if (!orderId) {
      router.push("/");
      return;
    }
  }, [dispatch, orderId, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green"></div>
      </div>
    );
  }

  return (
    <div>
      <Crumb crumb={img_about} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Congratulations Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Congratulations! 🎉</h1>
            <p className="text-xl text-gray-600 mb-4">Your order has been placed successfully</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
              <p className="text-green-800 font-medium">
                Order ID: <span className="font-bold">#{orderId}</span>
              </p>
            </div>
          </div>

          {/* Order Summary Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Order Details */}
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl font-semibold text-blue-800 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-semibold">#{orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-semibold">{items} item(s)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping Cost:</span>
                  <span className="font-semibold">30.00 EG</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-800">Total Amount:</span>
                  <span className="font-bold text-green-600 text-xl">{total.toFixed(2)} EG</span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader className="bg-amber-50">
                <CardTitle className="text-xl font-semibold text-amber-800 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <span className="text-gray-600 block mb-1">Shipping Address:</span>
                  <p className="font-semibold text-gray-800">{address}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Method:</span>
                  <span className="font-semibold">Standard Shipping</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-semibold">3-5 Business Days</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                  <p className="text-amber-800 text-sm">📦 You will receive a tracking number via email once your order ships.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment & Next Steps */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Payment Confirmation */}
            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="text-xl font-semibold text-green-800 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Confirmed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Payment Successful</span>
                </div>
                <p className="text-gray-600 text-sm">Your payment has been processed successfully. You will receive a receipt via email shortly.</p>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-xl font-semibold text-purple-800 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-700 font-medium">Order confirmed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Processing (1-2 days)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Shipped</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Delivered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green hover:bg-green-700">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>

            <p className="text-gray-600 text-sm mt-6">
              Need help?{" "}
              <Link href="/contact" className="text-green hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>

          {/* Thank You Message */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Your Order! 🌱</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We appreciate your business and trust in CropGuard. Your order helps us continue our mission of protecting crops and securing the future of agriculture. We'll take great care in processing and delivering your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
