"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { loadStripe } from "@stripe/stripe-js";

export default function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const discount = parseFloat(searchParams.get("discount") || "0");
  const coupon = searchParams.get("coupon") || "";

  const carts = useSelector((state: RootState) => state.carts.carts);
  const [shippingAddress, setShippingAddress] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const total = carts.reduce((acc, product) => acc + product.productPrice * product.quantity, 0);
  const shippingCost = 30;
  const finalTotal = total + shippingCost - discount;
  const itemsCount = carts.length;

  const stripePromise = loadStripe("pk_test_51RfNnGR30Ed29vHgz5fiGSjt5YgExcNSa8KdUYUNvbd94KmX4OiDtbfdiQIJHvPs5HDksr1hOszfxy5oNVW2ewbw00Qc8FtHXk");

  const handlePlaceOrder = async () => {
    // First validate shipping address
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

      // Create order first to get orderId
      const orderResponse = await axios.post(`${API_BASE_URL}/Order/Create`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!orderResponse.data.succeeded) {
        throw new Error(orderResponse.data.message || "Failed to create order");
      }

      const orderId = orderResponse.data.data.orderId;
      
      // Success URL to use for both payment methods
      const successUrl = `/order-success?orderId=${orderId}&total=${finalTotal.toFixed(2)}&items=${itemsCount}&address=${encodeURIComponent(shippingAddress)}`;
      
      // Handle payment method
      if (paymentMethod === "stripe") {
        // Create Stripe checkout session
        const response = await axios.post(
          `${API_BASE_URL}/Payment/checkout-session`,
          {
            orderId: orderId,
            successUrl: `${window.location.origin}${successUrl}`,
            cancelUrl: `${window.location.origin}/payment-cancelled`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        const checkoutUrl = response.data?.data;
        
        if (!checkoutUrl) {
          throw new Error("Failed to get Stripe checkout URL");
        }
        
        // Redirect directly to the checkout URL
        window.location.href = checkoutUrl;
      } else if (paymentMethod === "cash") {
        // Cash on delivery - redirect to success page directly with cash method parameter
        toast.success("Order placed successfully!");
        router.push(`${successUrl}&method=cash`);
      }
    } catch (error: any) {
      console.error("Order error:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div>
      <Crumb crumb={img_about} />
      <div className="max-w-6xl mx-auto py-8 px-4 my-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">Shipping Information</CardTitle>
                <CardDescription>Enter your shipping details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="shippingAddress">Shipping Address *</Label>
                  <Input 
                    id="shippingAddress" 
                    placeholder="Enter your full shipping address" 
                    value={shippingAddress} 
                    onChange={(e) => setShippingAddress(e.target.value)} 
                    required 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">Payment Method</CardTitle>
                <CardDescription>Select how you want to pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className={`flex items-center space-x-2 rounded-lg border p-4 ${paymentMethod === 'stripe' ? 'border-green bg-green-50' : 'border-gray-200'}`}>
                    <RadioGroupItem value="stripe" id="stripe" />
                    <Label htmlFor="stripe" className="flex items-center gap-3 cursor-pointer flex-1">
                      <CreditCardIcon className="h-5 w-5 text-green" />
                      <div>
                        <div className="font-medium">Pay with Card</div>
                        <div className="text-sm text-gray-500">Secure online payment via Stripe</div>
                      </div>
                    </Label>
                    <div className="flex gap-1">
                      <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34" height="22" rx="4" fill="#252525"/>
                        <path d="M11.5215 6.89844H7.68848V15.1104H11.5215V6.89844Z" fill="#2FABF7"/>
                        <path d="M8.01367 10.9998C8.01367 9.31184 8.85254 7.84375 10.1094 6.89746C9.38574 6.32422 8.47559 6.00195 7.49805 6.00195C5.00391 6.00195 3 8.34375 3 10.9998C3 13.6592 5.00391 16.001 7.49805 16.001C8.47559 16.001 9.38574 15.6787 10.1094 15.1055C8.85254 14.1621 8.01367 12.6875 8.01367 10.9998Z" fill="#D80E0E"/>
                        <path d="M21.7344 6.89844H17.9395V15.1104H21.7344V6.89844Z" fill="#FCCA28"/>
                        <path d="M18.2686 10.9998C18.2686 9.31184 19.1074 7.84375 20.3643 6.89746C19.6406 6.32422 18.7305 6.00195 17.7529 6.00195C15.2588 6.00195 13.2549 8.34375 13.2549 10.9998C13.2549 13.6592 15.2588 16.001 17.7529 16.001C18.7305 16.001 19.6406 15.6787 20.3643 15.1055C19.1074 14.1621 18.2686 12.6875 18.2686 10.9998Z" fill="#EA1D25"/>
                        <path d="M26.0449 6.00195C25.0674 6.00195 24.1572 6.32422 23.4336 6.89746C24.6904 7.84277 25.5293 9.31184 25.5293 10.9998C25.5293 12.6875 24.6904 14.1631 23.4336 15.1055C24.1572 15.6787 25.0674 16.001 26.0449 16.001C28.5391 16.001 30.543 13.6592 30.543 10.9998C30.543 8.34375 28.5391 6.00195 26.0449 6.00195Z" fill="#FCCA28"/>
                        <path d="M26.0479 16.001C25.0703 16.001 24.1602 15.6787 23.4365 15.1055C22.1797 14.1621 21.3408 12.6875 21.3408 10.9998C21.3408 9.31184 22.1797 7.84375 23.4365 6.89746C24.1602 6.32422 25.0703 6.00195 26.0479 6.00195C26.0508 6.00195 26.0518 6.00195 26.0547 6.00195C25.1445 6.00195 24.2344 6.32422 23.5107 6.89746C22.2539 7.84277 21.415 9.31184 21.415 10.9998C21.415 12.6875 22.2539 14.1631 23.5107 15.1055C24.2344 15.6787 25.1445 16.001 26.0547 16.001C26.0518 16.001 26.0508 16.001 26.0479 16.001Z" fill="#EA1D25"/>
                      </svg>
                      <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34" height="22" rx="4" fill="#1A1F71"/>
                        <path d="M13.4563 14.5752H11.0479L12.5552 7.42578H14.9636L13.4563 14.5752Z" fill="white"/>
                        <path d="M20.1846 7.61035C19.6826 7.42578 18.9375 7.2373 18.0088 7.2373C15.8604 7.2373 14.3516 8.36816 14.3428 10.0127C14.3252 11.2168 15.4121 11.8887 16.2168 12.292C17.043 12.7041 17.2949 12.9648 17.2949 13.3154C17.2861 13.8574 16.6494 14.1113 16.0586 14.1113C15.2236 14.1113 14.7803 13.9883 14.0703 13.6904L13.792 13.5586L13.5049 15.7422C14.0967 16.0049 15.1045 16.2305 16.1562 16.2393C18.4463 16.2393 19.9199 15.1172 19.9375 13.3594C19.9463 12.3955 19.3027 11.6416 18.0615 11.04C17.2861 10.6719 16.8252 10.4199 16.8252 10.0303C16.8342 9.67676 17.2158 9.31445 18.0703 9.31445C18.7891 9.29688 19.3203 9.46289 19.7197 9.62988L19.9199 9.73535L20.1846 7.61035Z" fill="white"/>
                        <path d="M23.0859 7.42578H25.0049L26.9238 14.5752H24.7676C24.7676 14.5752 24.5488 13.6816 24.4844 13.4033H21.9258C21.8438 13.6201 21.5127 14.5752 21.5127 14.5752H19.1045L22.4326 7.93262C22.6865 7.5791 22.9404 7.42578 23.0859 7.42578ZM24.1768 11.8359C24.1768 11.8359 23.4141 9.89746 23.2334 9.44531L22.5234 11.8359H24.1768Z" fill="white"/>
                        <path d="M10.4575 7.42578L7.28125 12.0625L7.03516 10.8584L6.17578 7.42578H3.74219V7.5752C4.81641 7.82617 5.78906 8.22461 6.38281 8.6582L8.73828 14.5752H11.1553L15.0439 7.42578H10.4575Z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-2 rounded-lg border p-4 ${paymentMethod === 'cash' ? 'border-green bg-green-50' : 'border-gray-200'}`}>
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                      <DollarSignIcon className="h-5 w-5 text-green" />
                      <div>
                        <div className="font-medium">الدفع عند الاستلام</div>
                        <div className="text-sm text-gray-500">Pay with cash when your order is delivered</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">Order Summary</CardTitle>
                <CardDescription>Review your order details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items Summary */}
                <div className="bg-gray-50 rounded-lg p-4 max-h-[240px] overflow-y-auto space-y-3">
                  {carts.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          {item.quantity}
                        </div>
                        <span className="font-medium">{item.productName}</span>
                      </div>
                      <span>{(item.productPrice * item.quantity).toFixed(2)} EG</span>
                    </div>
                  ))}
                </div>
                
                {coupon && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
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

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">{total.toFixed(2)} EG</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green">
                      <span>Discount:</span>
                      <span className="font-semibold">-{discount.toFixed(2)} EG</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-semibold">{shippingCost.toFixed(2)} EG</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-xl font-bold text-green">
                  <span>Total:</span>
                  <span>{finalTotal.toFixed(2)} EG</span>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-green hover:bg-green-600 py-6"
                  onClick={handlePlaceOrder} 
                  disabled={isPlacingOrder || !shippingAddress.trim()}
                >
                  {isPlacingOrder ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <span className="text-base">
                      {paymentMethod === "cash" ? "Place Order - الدفع عند الاستلام" : "Pay with Card"}
                    </span>
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-2">
                  By placing your order, you agree to our <a href="#" className="text-green underline">Terms of Service</a> and <a href="#" className="text-green underline">Privacy Policy</a>
                </p>
              </CardContent>
            </Card>
          </div>
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
