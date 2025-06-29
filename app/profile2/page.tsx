"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { getUserById, UserProfile } from "@/app/utils/api/User";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import { User, Mail, Phone, MapPin, UserCheck, Crown, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import Image from "next/image";

const ProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.sub) {
        router.push("/signin");
        return;
      }

      try {
        const token = getTokenClient();
        if (!token) {
          toast.error("Please login to view your profile");
          router.push("/signin");
          return;
        }

        const profileData = await getUserById(user.sub, token);
        setUserProfile(profileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load profile data");
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">{error || "Unable to load profile data"}</p>
          <button onClick={() => router.push("/dashboard")} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Farmer":
        return "bg-green-100 text-green-800";
      case "User":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Crown className="w-4 h-4" />;
      case "Farmer":
        return <User className="w-4 h-4" />;
      case "User":
        return <UserCheck className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {userProfile.imageUrl ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                      <Image src={userProfile.imageUrl} alt={userProfile.firstName} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {userProfile.firstName} {userProfile.lastName}
                </CardTitle>
                <p className="text-gray-600">@{userProfile.userName}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{userProfile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{userProfile.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{userProfile.address || "Not provided"}</span>
                  </div>
                </div>

                {/* Roles */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Account Roles</h4>
                  <div className="flex flex-wrap gap-2">
                    {user?.Role?.map((role: string, index: number) => (
                      <Badge key={index} className={`${getRoleBadgeColor(role)} flex items-center space-x-1`}>
                        {getRoleIcon(role)}
                        <span>{role}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <span className="text-gray-900">{userProfile.firstName}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <span className="text-gray-900">{userProfile.lastName}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <span className="text-gray-900">{userProfile.userName}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <span className="text-gray-900 text-xs font-mono">{userProfile.id}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <span className="text-gray-900">{userProfile.email}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <span className="text-gray-900">{userProfile.phone || "Not provided"}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <span className="text-gray-900">{userProfile.address || "Not provided"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button onClick={() => router.push("/")} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Edit Profile
                  </button>
                  <button onClick={() => router.push("/")} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                    Back to Home
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
