"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Download, Eye, MoreVertical, Calendar, DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

const BillingSettings = () => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const paymentMethods = [
    {
      id: 1,
      type: "visa",
      last4: "4532",
      expiry: "12/26",
      isDefault: true,
      name: "Ahmed Hassan",
    },
    {
      id: 2,
      type: "mastercard",
      last4: "8901",
      expiry: "08/25",
      isDefault: false,
      name: "Ahmed Hassan",
    },
  ];

  const transactions = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      amount: 245.50,
      status: "completed",
      description: "Organic Seeds & Fertilizers",
      method: "•••• 4532",
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      amount: 89.99,
      status: "completed",
      description: "Irrigation Equipment",
      method: "•••• 8901",
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-05",
      amount: 156.75,
      status: "completed",
      description: "Plant Protection Products",
      method: "•••• 4532",
    },
    {
      id: "REF-2024-001",
      date: "2024-01-03",
      amount: -25.00,
      status: "refunded",
      description: "Refund for damaged items",
      method: "•••• 4532",
    },
  ];

  const handleAddCard = () => {
    if (!newCard.number || !newCard.expiry || !newCard.cvv || !newCard.name) {
      toast.error("Please fill in all card details");
      return;
    }
    toast.success("Payment method added successfully!");
    setIsAddingCard(false);
    setNewCard({ number: "", expiry: "", cvv: "", name: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Payments</h1>
          <p className="text-gray-600">Manage your payment methods and billing history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Payment Methods
                </CardTitle>
                <Button 
                  onClick={() => setIsAddingCard(true)}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Card
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">•••• •••• •••• {method.last4}</span>
                          {method.isDefault && (
                            <Badge variant="secondary" className="text-xs">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.name} • Expires {method.expiry}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Set as Default</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}

                {isAddingCard && (
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <h4 className="font-medium mb-4">Add New Card</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          value={newCard.name}
                          onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Ahmed Hassan"
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={newCard.number}
                          onChange={(e) => setNewCard(prev => ({ ...prev, number: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          value={newCard.expiry}
                          onChange={(e) => setNewCard(prev => ({ ...prev, expiry: e.target.value }))}
                          placeholder="MM/YY"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={newCard.cvv}
                          onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleAddCard} size="sm">Save Card</Button>
                      <Button variant="outline" onClick={() => setIsAddingCard(false)} size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Transaction History</CardTitle>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          <DollarSign className={`w-5 h-5 ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{transaction.description}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{transaction.id}</span>
                            <span>•</span>
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.method}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} EG
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Billing Summary */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">492.24 EG</div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">3</div>
                      <div className="text-xs text-gray-600">Orders</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">1</div>
                      <div className="text-xs text-gray-600">Refunds</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Ahmed Hassan</p>
                  <p>123 Farm Street</p>
                  <p>Giza Governorate</p>
                  <p>Cairo, Egypt 12345</p>
                  <p>+20 123 456 7890</p>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Update Address
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  View Invoice
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Payment Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
