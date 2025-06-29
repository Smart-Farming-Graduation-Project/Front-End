"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";
import { Label } from "@/components/ui/label";
import { FaEye, FaPlus, FaRobot } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Rover = {
  id: string;
  userId: string;
  createdAt: string;
  userName: string;
};

type RoverDetails = {
  id: string;
  userId: string;
  createdAt: string;
  userName: string;
  // Additional details that might be available
  status?: string;
  location?: string;
  batteryLevel?: number;
  lastActivity?: string;
};

const RoversPage = () => {
  const [rovers, setRovers] = useState<Rover[]>([]);
  const [selectedRover, setSelectedRover] = useState<RoverDetails | null>(null);
  const [newRoverId, setNewRoverId] = useState("");

  // Dialog states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const token = getTokenClient();
  const { user } = useAuth();

  // Fetch all rovers
  const fetchRovers = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/Rover`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.succeeded) {
        setRovers(response.data.data || []);
      } else {
        toast.error(response.data.message || "Failed to fetch rovers");
      }
    } catch (error: any) {
      console.error("Error fetching rovers:", error);
      toast.error("Failed to fetch rovers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRovers();
  }, [token]);

  // View rover details
  const handleViewRover = async (roverId: string) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    setActionLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/Rover/${roverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.succeeded) {
        // Add mock additional data for demonstration
        const roverData = {
          ...response.data.data,
          status: "Active",
          location: "Field A-1",
          batteryLevel: Math.floor(Math.random() * 100),
          lastActivity: new Date().toISOString(),
        };
        setSelectedRover(roverData);
        setIsViewDialogOpen(true);
      } else {
        toast.error(response.data.message || "Failed to fetch rover details");
      }
    } catch (error: any) {
      console.error("Error fetching rover details:", error);
      toast.error("Failed to fetch rover details");
    } finally {
      setActionLoading(false);
    }
  };

  // Create new rover
  const handleCreateRover = async () => {
    if (!newRoverId.trim()) {
      toast.error("Please enter a rover ID");
      return;
    }

    if (!user?.given_name) {
      toast.error("User information not available");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    setActionLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/Rover/${newRoverId.trim()}/user/${user.given_name}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.succeeded) {
        toast.success("Rover created successfully");
        setIsCreateDialogOpen(false);
        setNewRoverId("");
        fetchRovers(); // Refresh rovers list
      } else {
        toast.error(response.data.message || "Failed to create rover");
      }
    } catch (error: any) {
      console.error("Error creating rover:", error);
      toast.error(error.response?.data?.message || "Failed to create rover");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete rover
  const handleDeleteRover = async (roverId: string) => {
    if (!user?.given_name) {
      toast.error("User information not available");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    setActionLoading(true);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/Rover/${roverId}/user/${user.given_name}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.succeeded) {
        setRovers(rovers.filter((rover) => rover.id !== roverId));
        toast.success("Rover deleted successfully");
        setIsDeleteDialogOpen(false);
        setSelectedRover(null);
      } else {
        toast.error(response.data.message || "Failed to delete rover");
      }
    } catch (error: any) {
      console.error("Error deleting rover:", error);
      toast.error(error.response?.data?.message || "Failed to delete rover");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen overflow-x-hidden">
      <div className="p-2 mt-12 md:mt-0">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold">Rover Management</h1>
          <span className="bg-blue-500 px-2 py-0.5 text-white text-xs rounded-full">
            Smart Farming
          </span>
        </div>
        <span className="block h-1 w-14 bg-green rounded-lg"></span>
      </div>

      <div className="w-full px-2 md:px-4 mt-6 max-w-full overflow-hidden">
        {/* Header with stats and create button */}
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 mb-6 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Active Rovers</h3>
              <p className="text-sm text-gray-600">
                Manage and monitor your autonomous farming rovers
              </p>
              <div className="flex gap-4 mt-2">
                <div className="bg-blue-50 px-3 py-1 rounded-lg text-center">
                  <p className="text-xs text-gray-600">Total Rovers</p>
                  <p className="font-bold text-lg">{rovers.length}</p>
                </div>
                <div className="bg-green-50 px-3 py-1 rounded-lg text-center">
                  <p className="text-xs text-gray-600">Active</p>
                  <p className="font-bold text-lg text-green-600">
                    {rovers.filter((r) => r.userName).length}
                  </p>
                </div>
              </div>
            </div>

            {/* Create Rover Button */}
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-green hover:bg-green-700 text-white">
                  <FaPlus className="mr-2" />
                  Book New Rover
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FaRobot className="text-blue-500" />
                    Book New Rover
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="roverId">Rover ID *</Label>
                    <Input
                      id="roverId"
                      placeholder="Enter unique rover ID (e.g., RV-001)"
                      value={newRoverId}
                      onChange={(e) => setNewRoverId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be associated with your account:{" "}
                      {user?.given_name}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-2">
                      Rover Capabilities
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Autonomous field monitoring</li>
                      <li>• Real-time data collection</li>
                      <li>• GPS tracking and navigation</li>
                      <li>• Smart irrigation control</li>
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleCreateRover}
                    disabled={actionLoading || !newRoverId.trim()}
                    className="bg-green text-white"
                  >
                    {actionLoading ? "Booking..." : "Book Rover"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Rovers List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-3 md:p-4 border-b">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaRobot className="text-blue-500" />
              Your Rovers ({rovers.length})
            </h3>
          </div>

          <div className="divide-y">
            {rovers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FaRobot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No rovers found
                </h3>
                <p className="text-gray-600 mb-4">
                  Book your first rover to start autonomous farming
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-green hover:bg-green-700 text-white"
                >
                  <FaPlus className="mr-2" />
                  Book Your First Rover
                </Button>
              </div>
            ) : (
              rovers.map((rover) => (
                <div key={rover.id} className="p-3 md:p-4">
                  {/* Mobile Layout */}
                  <div className="block md:hidden space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaRobot className="text-blue-600 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-base">Rover #{rover.id}</h4>
                        <p className="text-sm text-gray-600">
                          Owner: {rover.userName}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 ml-auto"
                      >
                        Active
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">User ID:</span>
                        <p className="font-medium truncate">
                          {rover.userId.slice(0, 8)}...
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Created:</span>
                        <p className="font-medium">{formatDate(rover.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => handleViewRover(rover.id)}
                        disabled={actionLoading}
                      >
                        <FaEye className="mr-1" />
                        View Details
                      </Button>

                      <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1 text-xs"
                            onClick={() => setSelectedRover(rover)}
                          >
                            <MdDelete className="mr-1" />
                            Release
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaRobot className="text-blue-600 w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-base">Rover #{rover.id}</h4>
                        <p className="text-sm text-gray-600">
                          Operator: {rover.userName}
                        </p>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                          <span>ID: {rover.userId.slice(0, 8)}...</span>
                          <span>Created: {formatDate(rover.createdAt)}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewRover(rover.id)}
                        disabled={actionLoading}
                      >
                        <FaEye className="mr-1" />
                        View Details
                      </Button>

                      <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setSelectedRover(rover)}
                          >
                            <MdDelete className="mr-1" />
                            Release Rover
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
      </div>

      {/* View Rover Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FaRobot className="text-blue-500" />
              Rover Details - #{selectedRover?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedRover && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Rover ID</Label>
                  <p className="font-medium text-lg">{selectedRover.id}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {selectedRover.status || "Active"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Operator</Label>
                  <p className="font-medium">{selectedRover.userName}</p>
                </div>
                <div>
                  <Label>User ID</Label>
                  <p className="font-medium text-sm">{selectedRover.userId}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Created At</Label>
                  <p className="font-medium">
                    {formatDate(selectedRover.createdAt)}
                  </p>
                </div>
                <div>
                  <Label>Last Activity</Label>
                  <p className="font-medium">
                    {selectedRover.lastActivity
                      ? formatDate(selectedRover.lastActivity)
                      : "Just now"}
                  </p>
                </div>
              </div>

              {/* Operational Data */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <FaRobot className="w-5 h-5" />
                  Operational Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded border border-blue-100">
                    <p className="text-xs text-gray-500">Current Location</p>
                    <p className="font-medium">
                      {selectedRover.location || "Field A-1"}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-100">
                    <p className="text-xs text-gray-500">Battery Level</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${selectedRover.batteryLevel || 85}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {selectedRover.batteryLevel || 85}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-100">
                    <p className="text-xs text-gray-500">Connection</p>
                    <p className="font-medium text-green-600">Online</p>
                  </div>
                </div>
              </div>

              {/* Capabilities */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-3">
                  Rover Capabilities
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Autonomous Navigation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Soil Monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Crop Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Weather Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Irrigation Control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Pest Detection</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Rover Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Release Rover</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to release rover &quot;#{selectedRover?.id}
            &quot;? This will remove it from your account and make it available
            for other users.
          </p>
          <DialogFooter>
            <Button
              onClick={() => selectedRover && handleDeleteRover(selectedRover.id)}
              disabled={actionLoading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {actionLoading ? "Releasing..." : "Release Rover"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedRover(null);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoversPage;