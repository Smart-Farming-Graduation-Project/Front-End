"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaEye, FaEdit, FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { Order, CreateOrder, UpdateOrder, CreateOrderItem } from "@/app/utils/types/app";

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const Manage_Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editOrder, setEditOrder] = useState<UpdateOrder | null>(null);

  // Add user information state
  const [userInfo, setUserInfo] = useState<{ [key: string]: { firstName: string; lastName: string } }>({});

  // Create order states
  const [newOrder, setNewOrder] = useState<CreateOrder>({
    shippingAddress: "",
    orderItems: [{ productId: 1, quantity: 1, cupon: null }],
  });

  // Dialog states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const token = getTokenClient();

  // Fetch user information by ID
  const fetchUserInfo = async (userId: string) => {
    if (!token || userInfo[userId]) {
      return userInfo[userId] || null;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/User/GetById/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.succeeded) {
        const userData = {
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
        };
        setUserInfo((prev) => ({ ...prev, [userId]: userData }));
        return userData;
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
    return null;
  };

  // Fetch all orders
  const fetchOrders = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/Order/OrdersList`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.succeeded) {
        setOrders(response.data.data);
        // Fetch user info for all orders
        const userIds: string[] = Array.from(new Set(response.data.data.map((order: Order) => order.userId))) as string[];
        userIds.forEach((userId: string) => fetchUserInfo(userId));
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  // Create new order
  const handleCreateOrder = async () => {
    if (!newOrder.shippingAddress.trim() || newOrder.orderItems.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/Order/Create`, newOrder, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.succeeded) {
        toast.success("Order created successfully");
        setIsCreateDialogOpen(false);
        setNewOrder({
          shippingAddress: "",
          orderItems: [{ productId: 1, quantity: 1, cupon: null }],
        });
        fetchOrders(); // Refresh orders list
      } else {
        toast.error(response.data.message || "Failed to create order");
      }
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast.error(error.response?.data?.message || "Failed to create order");
    }
  };

  // Helper function to get user display name
  const getUserDisplayName = (userId: string) => {
    const user = userInfo[userId];
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return `User ID: ${userId}`;
  };

  // Update order
  const handleUpdateOrder = async () => {
    if (!editOrder || !editOrder.shippingAddress.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/Order/Update`, editOrder, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.succeeded) {
        // Update order in the list
        setOrders(orders.map((order) => (order.orderId === editOrder.id ? { ...order, shippingAddress: editOrder.shippingAddress, status: editOrder.status } : order)));

        toast.success("Order updated successfully");
        setIsEditDialogOpen(false);
        setEditOrder(null);
        fetchOrders(); // Refresh to get updated data
      } else {
        toast.error(response.data.message || "Failed to update order");
      }
    } catch (error: any) {
      console.error("Error updating order:", error);
      toast.error(error.response?.data?.message || "Failed to update order");
    }
  };

  // Delete order
  const handleDeleteOrder = async (id: number) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/Order/Delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(orders.filter((order) => order.orderId !== id));
      toast.success("Order deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedOrder(null);
    } catch (error: any) {
      console.error("Error deleting order:", error);
      toast.error(error.response?.data?.message || "Failed to delete order");
    }
  };

  // View order details
  const handleViewOrder = async (orderId: number) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/Order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.succeeded) {
        setSelectedOrder(response.data.data);
        setIsViewDialogOpen(true);
      } else {
        toast.error(response.data.message || "Failed to fetch order details");
      }
    } catch (error: any) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to fetch order details");
    }
  };

  // Helper functions for create order
  const addOrderItem = () => {
    setNewOrder({
      ...newOrder,
      orderItems: [...newOrder.orderItems, { productId: 1, quantity: 1, cupon: null }],
    });
  };

  const removeOrderItem = (index: number) => {
    if (newOrder.orderItems.length > 1) {
      setNewOrder({
        ...newOrder,
        orderItems: newOrder.orderItems.filter((_, i) => i !== index),
      });
    }
  };

  const updateOrderItem = (index: number, field: keyof CreateOrderItem, value: any) => {
    const updatedItems = newOrder.orderItems.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setNewOrder({ ...newOrder, orderItems: updatedItems });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Header with stats and create button */}
      <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Order Management</h3>
            <p className="text-sm text-gray-600">Showing {orders.length} orders</p>
          </div>

          {/* Create Order Button */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green hover:bg-green-700 text-white">
                <FaPlus className="mr-2" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Shipping Address *</Label>
                  <Input placeholder="Enter shipping address" value={newOrder.shippingAddress} onChange={(e) => setNewOrder({ ...newOrder, shippingAddress: e.target.value })} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Order Items</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addOrderItem}>
                      <FaPlus className="mr-1" />
                      Add Item
                    </Button>
                  </div>

                  {newOrder.orderItems.map((item, index) => (
                    <div key={index} className="flex gap-2 items-end mb-2 p-3 border rounded">
                      <div className="flex-1">
                        <Label className="text-sm">Product ID</Label>
                        <Input type="number" value={item.productId} onChange={(e) => updateOrderItem(index, "productId", parseInt(e.target.value) || 1)} min="1" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm">Quantity</Label>
                        <Input type="number" value={item.quantity} onChange={(e) => updateOrderItem(index, "quantity", parseInt(e.target.value) || 1)} min="1" />
                      </div>
                      {newOrder.orderItems.length > 1 && (
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeOrderItem(index)}>
                          <FaMinus />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateOrder} className="bg-green text-white">
                  Create Order
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-3 md:p-4 border-b">
          <h3 className="text-lg font-semibold">Orders ({orders.length})</h3>
        </div>

        <div className="divide-y">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No orders found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.orderId} className="p-3 md:p-4">
                {/* Mobile Layout */}
                <div className="block md:hidden space-y-3">
                  <div>
                    <h4 className="font-medium text-base">Order #{order.orderId}</h4>
                    <p className="text-sm text-gray-600">{getUserDisplayName(order.userId)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <p className={`font-medium ${order.status === "Delivered" ? "text-green-600" : order.status === "Cancelled" ? "text-red-600" : order.status === "Shipped" ? "text-blue-600" : "text-yellow-600"}`}>{order.status}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Total:</span>
                      <p className="font-medium text-green">EG {order.totalAmount}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Items:</span>
                      <p className="font-medium">{order.orderItems.length} item(s)</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Qty:</span>
                      <p className="font-medium">{order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-gray-500">Date:</span>
                    <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => handleViewOrder(order.orderId)}>
                      <FaEye className="mr-1" />
                      View
                    </Button>

                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() =>
                            setEditOrder({
                              id: order.orderId,
                              shippingAddress: order.shippingAddress,
                              status: order.status,
                            })
                          }>
                          <FaEdit className="mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="flex-1 text-xs" onClick={() => setSelectedOrder(order)}>
                          <MdDelete className="mr-1" />
                          Delete
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base">Order #{order.orderId}</h4>
                    <p className="text-sm text-gray-600 truncate">{getUserDisplayName(order.userId)}</p>
                    <div className="flex gap-4 text-sm text-gray-500 mt-1 flex-wrap">
                      <span className={`font-medium ${order.status === "Delivered" ? "text-green-600" : order.status === "Cancelled" ? "text-red-600" : order.status === "Shipped" ? "text-blue-600" : "text-yellow-600"}`}>{order.status}</span>
                      <span>Total: EG {order.totalAmount}</span>
                      <span>{order.orderItems.length} item(s)</span>
                      <span>Qty: {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                      <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewOrder(order.orderId)}>
                      <FaEye className="mr-1" />
                      View
                    </Button>

                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEditOrder({
                              id: order.orderId,
                              shippingAddress: order.shippingAddress,
                              status: order.status,
                            })
                          }>
                          <FaEdit className="mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" onClick={() => setSelectedOrder(order)}>
                          <MdDelete className="mr-1" />
                          Delete
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details - #{selectedOrder?.orderId}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Order ID</Label>
                  <p className="font-medium">{selectedOrder.orderId}</p>
                </div>
                <div>
                  <Label>Customer</Label>
                  <p className="font-medium text-sm">{getUserDisplayName(selectedOrder.userId)}</p>
                </div>
              </div>

              <div>
                <Label>Shipping Address</Label>
                <p className="font-medium">{selectedOrder.shippingAddress}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Status</Label>
                  <p className={`font-medium ${selectedOrder.status === "Delivered" ? "text-green-600" : selectedOrder.status === "Cancelled" ? "text-red-600" : selectedOrder.status === "Shipped" ? "text-blue-600" : "text-yellow-600"}`}>
                    {selectedOrder.status}
                  </p>
                </div>
                <div>
                  <Label>Order Date</Label>
                  <p className="font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label>Total Amount</Label>
                  <p className="font-medium text-green">EG {selectedOrder.totalAmount}</p>
                </div>
              </div>

              <div>
                <Label>Order Items</Label>
                <div className="mt-2 space-y-2">
                  {selectedOrder.orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="font-medium">Product ID: {item.productId}</p>
                        <p className="text-sm text-gray-600">Quantity: <span className="font-semibold text-green">{item.quantity}</span></p>
                        <p className="text-sm text-gray-600">Unit Price: EG {item.unitPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">EG {item.unitPrice}</p>
                        <p className="text-sm text-gray-600">
                          Subtotal: <span className="font-semibold text-green">EG {(item.quantity * item.unitPrice).toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Order Summary */}
                  <div className="mt-4 p-3 bg-green-50 rounded border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order Summary</p>
                        <p className="text-sm text-gray-600">
                          Total Items: {selectedOrder.orderItems.length} | 
                          Total Quantity: {selectedOrder.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green">EG {selectedOrder.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Shipping Address *</Label>
              <Input value={editOrder?.shippingAddress || ""} onChange={(e) => setEditOrder(editOrder ? { ...editOrder, shippingAddress: e.target.value } : null)} placeholder="Shipping address" />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={editOrder?.status || "Pending"} onValueChange={(value) => setEditOrder(editOrder ? { ...editOrder, status: value } : null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateOrder} className="bg-green text-white">
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditOrder(null);
              }}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Order Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete order #{selectedOrder?.orderId}? This action cannot be undone.</p>
          <DialogFooter>
            <Button onClick={() => selectedOrder && handleDeleteOrder(selectedOrder.orderId)} className="bg-red-600 text-white hover:bg-red-700">
              Delete Order
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedOrder(null);
              }}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Manage_Orders;
