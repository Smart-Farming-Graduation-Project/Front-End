"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Globe, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Trash2
} from "lucide-react";
import toast from "react-hot-toast";

const PrivacySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showPurchaseHistory: false,
    allowDataCollection: true,
    marketingCommunications: false,
    thirdPartySharing: false,
    activityTracking: true,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const recentActivity = [
    {
      action: "Login",
      device: "Chrome on Windows",
      location: "Cairo, Egypt",
      time: "2 hours ago",
      status: "success",
    },
    {
      action: "Password Changed",
      device: "Mobile App",
      location: "Cairo, Egypt", 
      time: "1 day ago",
      status: "success",
    },
    {
      action: "Login Attempt",
      device: "Firefox on Mac",
      location: "Unknown Location",
      time: "3 days ago",
      status: "blocked",
    },
    {
      action: "Order Placed",
      device: "Chrome on Mobile",
      location: "Cairo, Egypt",
      time: "5 days ago",
      status: "success",
    },
  ];

  const connectedApps = [
    {
      name: "Weather Service",
      description: "Provides weather updates for farming",
      lastAccess: "2 hours ago",
      permissions: ["Location", "Notifications"],
    },
    {
      name: "Crop Calendar",
      description: "Agricultural calendar integration",
      lastAccess: "1 day ago", 
      permissions: ["Calendar", "Notifications"],
    },
  ];

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error("Please fill in all password fields");
      return;
    }
    
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match");
      return;
    }

    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    toast.success("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handlePrivacyToggle = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
    toast.success("Privacy setting updated");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "blocked":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "blocked":
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy & Security</h1>
          <p className="text-gray-600">Manage your account security and privacy preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Security Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Password Change */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-3"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-3"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button onClick={handlePasswordChange} className="w-full">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  Two-Factor Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">SMS Authentication</h4>
                    <p className="text-sm text-gray-600">
                      Receive a code via SMS for additional security
                    </p>
                  </div>
                  <Switch 
                    checked={twoFactorEnabled} 
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                {twoFactorEnabled && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      Two-factor authentication is enabled. You'll receive SMS codes at +20 123 *** 7890
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Show Email Address</h4>
                    <p className="text-sm text-gray-600">Allow others to see your email in public profile</p>
                  </div>
                  <Switch 
                    checked={privacySettings.showEmail}
                    onCheckedChange={(checked) => handlePrivacyToggle("showEmail", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Show Phone Number</h4>
                    <p className="text-sm text-gray-600">Display phone number in public profile</p>
                  </div>
                  <Switch 
                    checked={privacySettings.showPhone}
                    onCheckedChange={(checked) => handlePrivacyToggle("showPhone", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Purchase History Visibility</h4>
                    <p className="text-sm text-gray-600">Allow others to see your purchase activity</p>
                  </div>
                  <Switch 
                    checked={privacySettings.showPurchaseHistory}
                    onCheckedChange={(checked) => handlePrivacyToggle("showPurchaseHistory", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Data Collection</h4>
                    <p className="text-sm text-gray-600">Allow us to collect usage data to improve experience</p>
                  </div>
                  <Switch 
                    checked={privacySettings.allowDataCollection}
                    onCheckedChange={(checked) => handlePrivacyToggle("allowDataCollection", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Marketing Communications</h4>
                    <p className="text-sm text-gray-600">Receive personalized marketing content</p>
                  </div>
                  <Switch 
                    checked={privacySettings.marketingCommunications}
                    onCheckedChange={(checked) => handlePrivacyToggle("marketingCommunications", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Connected Apps */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  Connected Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {connectedApps.map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{app.name}</h4>
                      <p className="text-sm text-gray-600">{app.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">Last access: {app.lastAccess}</span>
                        <div className="flex gap-1">
                          {app.permissions.map((permission, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                      Revoke
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Activity Log */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-800">Account Secure</h4>
                      <p className="text-xs text-green-600">All security checks passed</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Password Strength</span>
                      <Badge className="bg-green-100 text-green-800">Strong</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>2FA Status</span>
                      <Badge className={twoFactorEnabled ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {twoFactorEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Login</span>
                      <span className="text-gray-600">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                      {getStatusIcon(activity.status)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{activity.action}</h4>
                        <p className="text-xs text-gray-600">{activity.device}</p>
                        <p className="text-xs text-gray-600">{activity.location}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download My Data
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
