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
import { FaChevronLeft, FaChevronRight, FaUserEdit, FaUserShield } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import toast from "react-hot-toast";

type User = {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  address: string | null;
  imageUrl: string;
};

type UpdateUser = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  address: string;
};

type ChangeRole = {
  userName: string;
  roleName: string;
  newRoleName: string;
};

type PaginationMeta = {
  "Current Page": number;
  "Total Pages": number;
  "Page Size": number;
  "Total Count": number;
  "Has Next": boolean;
  "Has Previous": boolean;
};

const Manage_Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<UpdateUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleChange, setRoleChange] = useState<ChangeRole>({ userName: "", roleName: "", newRoleName: "" });

  // Dialog states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);

  const [loading, setLoading] = useState(true);
  const token = getTokenClient();

  // Fetch users with pagination
  const fetchUsers = async (page: number = currentPage) => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/User/GetUsers?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.succeeded) {
        setUsers(response.data.data);
        setPaginationMeta(response.data.meta);
        setCurrentPage(page);
      } else {
        toast.error(response.data.message || "Failed to fetch users");
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, [token]);

  // Edit user
  const handleEditUser = async () => {
    if (!editUser || !editUser.firstName.trim() || !editUser.lastName.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/User/Edit`,
        {
          id: editUser.id,
          firstName: editUser.firstName.trim(),
          lastName: editUser.lastName.trim(),
          userName: editUser.userName.trim(),
          phone: editUser.phone.trim(),
          address: editUser.address?.trim() || "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update user in the list
      setUsers(
        users.map((user) =>
          user.id === editUser.id
            ? {
                ...user,
                firstName: editUser.firstName,
                lastName: editUser.lastName,
                fullName: `${editUser.firstName} ${editUser.lastName}`,
                userName: editUser.userName,
                phone: editUser.phone,
                address: editUser.address,
              }
            : user
        )
      );

      toast.success("User updated successfully");
      setIsEditDialogOpen(false);
      setEditUser(null);
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  // Delete user
  const handleDeleteUser = async (id: string) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/User/Delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);

      // Refresh if current page becomes empty
      if (users.length === 1 && currentPage > 1) {
        fetchUsers(currentPage - 1);
      }
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // Change user role
  const handleChangeRole = async () => {
    if (!roleChange.userName || !roleChange.roleName || !roleChange.newRoleName) {
      toast.error("Please fill in all role fields");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/User/user-role/change`, roleChange, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("User role changed successfully");
      setIsRoleDialogOpen(false);
      setRoleChange({ userName: "", roleName: "", newRoleName: "" });

      // Refresh users to reflect role changes
      fetchUsers(currentPage);
    } catch (error: any) {
      console.error("Error changing user role:", error);
      toast.error(error.response?.data?.message || "Failed to change user role");
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (paginationMeta && paginationMeta["Has Next"]) {
      fetchUsers(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (paginationMeta && paginationMeta["Has Previous"]) {
      fetchUsers(currentPage - 1);
    }
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
      {/* Header with stats */}
      <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">User Management</h3>
            <p className="text-sm text-gray-600">
              Showing {users.length} of {paginationMeta?.["Total Count"] || 0} users
            </p>
          </div>

          {/* Change Role Button */}
          <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <FaUserShield className="mr-2" />
                Change User Role
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Change User Role</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Username</Label>
                  <Input placeholder="Enter username" value={roleChange.userName} onChange={(e) => setRoleChange({ ...roleChange, userName: e.target.value })} />
                </div>
                <div>
                  <Label>Current Role</Label>
                  <Select value={roleChange.roleName} onValueChange={(value) => setRoleChange({ ...roleChange, roleName: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>New Role</Label>
                  <Select value={roleChange.newRoleName} onValueChange={(value) => setRoleChange({ ...roleChange, newRoleName: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleChangeRole} className="bg-purple-600 text-white">
                  Change Role
                </Button>
                <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-3 md:p-4 border-b">
          <h3 className="text-lg font-semibold">
            Users (Page {currentPage} of {paginationMeta?.["Total Pages"] || 1})
          </h3>
        </div>

        <div className="divide-y">
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No users found</p>
            </div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="p-3 md:p-4">
                {/* Mobile Layout */}
                <div className="block md:hidden space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image src={user.imageUrl || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`} alt={user.fullName} fill className="rounded-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">{user.fullName}</h4>
                      <p className="text-sm text-gray-600">@{user.userName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-medium truncate">{user.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>

                  {user.address && (
                    <div className="text-sm">
                      <span className="text-gray-500">Address:</span>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() =>
                            setEditUser({
                              id: user.id,
                              firstName: user.firstName,
                              lastName: user.lastName,
                              userName: user.userName,
                              phone: user.phone,
                              address: user.address || "",
                            })
                          }>
                          <FaUserEdit className="mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="flex-1 text-xs" onClick={() => setSelectedUser(user)}>
                          <MdDelete className="mr-1" />
                          Delete
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image src={user.imageUrl || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`} alt={user.fullName} fill className="rounded-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-base truncate">{user.fullName}</h4>
                      <p className="text-sm text-gray-600 truncate">@{user.userName}</p>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span className="truncate">{user.email}</span>
                        <span>{user.phone}</span>
                        {user.address && <span className="truncate">{user.address}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEditUser({
                              id: user.id,
                              firstName: user.firstName,
                              lastName: user.lastName,
                              userName: user.userName,
                              phone: user.phone,
                              address: user.address || "",
                            })
                          }>
                          <FaUserEdit className="mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" onClick={() => setSelectedUser(user)}>
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

        {/* Pagination */}
        {paginationMeta && paginationMeta["Total Pages"] > 1 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {paginationMeta["Total Pages"]}
                <span className="ml-2">({paginationMeta["Total Count"]} total users)</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={!paginationMeta["Has Previous"]}>
                  <FaChevronLeft className="mr-1" />
                  Previous
                </Button>

                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={!paginationMeta["Has Next"]}>
                  Next
                  <FaChevronRight className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input value={editUser?.firstName || ""} onChange={(e) => setEditUser(editUser ? { ...editUser, firstName: e.target.value } : null)} placeholder="First name" />
              </div>
              <div>
                <Label>Last Name *</Label>
                <Input value={editUser?.lastName || ""} onChange={(e) => setEditUser(editUser ? { ...editUser, lastName: e.target.value } : null)} placeholder="Last name" />
              </div>
            </div>
            <div>
              <Label>Username *</Label>
              <Input value={editUser?.userName || ""} onChange={(e) => setEditUser(editUser ? { ...editUser, userName: e.target.value } : null)} placeholder="Username" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={editUser?.phone || ""} onChange={(e) => setEditUser(editUser ? { ...editUser, phone: e.target.value } : null)} placeholder="Phone number" />
            </div>
            <div>
              <Label>Address</Label>
              <Input value={editUser?.address || ""} onChange={(e) => setEditUser(editUser ? { ...editUser, address: e.target.value } : null)} placeholder="Address" />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button onClick={handleEditUser} className="bg-green text-white w-full sm:w-auto order-2 sm:order-1">
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditUser(null);
              }}
              className="w-full sm:w-auto order-1 sm:order-2">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete user &quot;{selectedUser?.fullName}&quot;? This action cannot be undone.</p>
          <DialogFooter>
            <Button onClick={() => selectedUser && handleDeleteUser(selectedUser.id)} className="bg-red-600 text-white hover:bg-red-700">
              Delete User
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedUser(null);
              }}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Manage_Users;
