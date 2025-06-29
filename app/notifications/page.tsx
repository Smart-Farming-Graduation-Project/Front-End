"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Mail, Smartphone, MessageSquare, ShoppingCart, Leaf, AlertTriangle, Save } from "lucide-react";
import toast from "react-hot-toast";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    securityAlerts: true,
    farmingTips: true,
    productRecommendations: false,
    wishlistReminders: true,
    lowStockAlerts: true,
  });

  const [pushNotifications, setPushNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    securityAlerts: true,
    farmingTips: false,
    productRecommendations: false,
    wishlistReminders: true,
  });

  const [smsNotifications, setSmsNotifications] = useState({
    orderUpdates: true,
    securityAlerts: true,
    emergencyAlerts: true,
  });

  const [notificationFrequency, setNotificationFrequency] = useState("daily");
  const [isSaving, setIsSaving] = useState(false);

  const handleEmailToggle = (key: string, value: boolean) => {
    setEmailNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePushToggle = (key: string, value: boolean) => {
    setPushNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSmsToggle = (key: string, value: boolean) => {
    setSmsNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Notification preferences saved successfully!");
    } catch (error) {
      toast.error("Failed to save preferences");
    } finally {
      setIsSaving(false);
    }
  };

  const NotificationItem = ({ 
    icon: Icon, 
    title, 
    description, 
    checked, 
    onToggle 
  }: {
    icon: any;
    title: string;
    description: string;
    checked: boolean;
    onToggle: (checked: boolean) => void;
  }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Settings</h1>
          <p className="text-gray-600">Customize how and when you receive notifications</p>
        </div>

        <div className="space-y-6">
          {/* Email Notifications */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationItem
                icon={ShoppingCart}
                title="Order Updates"
                description="Get notified about order confirmations, shipping, and delivery updates"
                checked={emailNotifications.orderUpdates}
                onToggle={(checked) => handleEmailToggle("orderUpdates", checked)}
              />
              <NotificationItem
                icon={Bell}
                title="Promotions & Offers"
                description="Receive exclusive deals, discounts, and promotional campaigns"
                checked={emailNotifications.promotions}
                onToggle={(checked) => handleEmailToggle("promotions", checked)}
              />
              <NotificationItem
                icon={MessageSquare}
                title="Newsletter"
                description="Weekly updates about farming trends, news, and CropGuard updates"
                checked={emailNotifications.newsletter}
                onToggle={(checked) => handleEmailToggle("newsletter", checked)}
              />
              <NotificationItem
                icon={AlertTriangle}
                title="Security Alerts"
                description="Important security notifications about your account"
                checked={emailNotifications.securityAlerts}
                onToggle={(checked) => handleEmailToggle("securityAlerts", checked)}
              />
              <NotificationItem
                icon={Leaf}
                title="Farming Tips"
                description="Expert advice and seasonal farming recommendations"
                checked={emailNotifications.farmingTips}
                onToggle={(checked) => handleEmailToggle("farmingTips", checked)}
              />
              <NotificationItem
                icon={Bell}
                title="Product Recommendations"
                description="Personalized product suggestions based on your purchases"
                checked={emailNotifications.productRecommendations}
                onToggle={(checked) => handleEmailToggle("productRecommendations", checked)}
              />
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                Push Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationItem
                icon={ShoppingCart}
                title="Order Updates"
                description="Real-time updates on your orders"
                checked={pushNotifications.orderUpdates}
                onToggle={(checked) => handlePushToggle("orderUpdates", checked)}
              />
              <NotificationItem
                icon={Bell}
                title="Promotions"
                description="Flash sales and limited-time offers"
                checked={pushNotifications.promotions}
                onToggle={(checked) => handlePushToggle("promotions", checked)}
              />
              <NotificationItem
                icon={AlertTriangle}
                title="Security Alerts"
                description="Immediate security notifications"
                checked={pushNotifications.securityAlerts}
                onToggle={(checked) => handlePushToggle("securityAlerts", checked)}
              />
              <NotificationItem
                icon={Leaf}
                title="Farming Tips"
                description="Quick farming tips and weather alerts"
                checked={pushNotifications.farmingTips}
                onToggle={(checked) => handlePushToggle("farmingTips", checked)}
              />
            </CardContent>
          </Card>

          {/* SMS Notifications */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                SMS Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationItem
                icon={ShoppingCart}
                title="Order Updates"
                description="Critical order status updates via SMS"
                checked={smsNotifications.orderUpdates}
                onToggle={(checked) => handleSmsToggle("orderUpdates", checked)}
              />
              <NotificationItem
                icon={AlertTriangle}
                title="Security Alerts"
                description="Account security notifications"
                checked={smsNotifications.securityAlerts}
                onToggle={(checked) => handleSmsToggle("securityAlerts", checked)}
              />
              <NotificationItem
                icon={AlertTriangle}
                title="Emergency Alerts"
                description="Weather warnings and farming emergency alerts"
                checked={smsNotifications.emergencyAlerts}
                onToggle={(checked) => handleSmsToggle("emergencyAlerts", checked)}
              />
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="frequency">Email Frequency</Label>
                <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Instant</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Quiet Hours</h4>
                <p className="text-sm text-gray-600 mb-3">
                  No push notifications will be sent during these hours
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quietStart">From</Label>
                    <Select defaultValue="22:00">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                        <SelectItem value="23:00">11:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quietEnd">To</Label>
                    <Select defaultValue="07:00">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="06:00">6:00 AM</SelectItem>
                        <SelectItem value="07:00">7:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
