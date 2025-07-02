"use client";
import React, { useState, useRef, useEffect } from "react";
import { Settings, Monitor, Moon, Sun, Globe, Bell, Shield, Palette, Zap, Database, Wifi, Volume2 } from "lucide-react";
import toast from "react-hot-toast";

const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.success(`${!darkMode ? "Dark" : "Light"} mode enabled`);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast.success(`Notifications ${!notifications ? "enabled" : "disabled"}`);
  };

  const toggleAutoSave = () => {
    setAutoSave(!autoSave);
    toast.success(`Auto-save ${!autoSave ? "enabled" : "disabled"}`);
  };

  const quickActions = [
    { icon: Globe, label: "Language", value: "English", action: () => {} },
    { icon: Monitor, label: "Display", value: "1920x1080", action: () => {} },
    { icon: Volume2, label: "Sound", value: "On", action: () => {} },
    { icon: Wifi, label: "Connection", value: "Connected", action: () => {} },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative" title="Settings">
        <Settings className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-green-600" />
              <h3 className="text-sm font-semibold text-gray-900">Quick Settings</h3>
            </div>
          </div>

          {/* Toggle Settings */}
          <div className="py-2">
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Preferences</p>
            </div>

            {/* Dark Mode Toggle */}
            <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                  <div>
                    <p className="text-sm text-gray-700">Dark Mode</p>
                    <p className="text-xs text-gray-500">Toggle dark theme</p>
                  </div>
                </div>
                <button onClick={toggleDarkMode} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${darkMode ? "bg-green-600" : "bg-gray-300"}`}>
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </div>
            </div>

            {/* Notifications Toggle */}
            <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-700">Notifications</p>
                    <p className="text-xs text-gray-500">Push notifications</p>
                  </div>
                </div>
                <button onClick={toggleNotifications} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${notifications ? "bg-green-600" : "bg-gray-300"}`}>
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${notifications ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </div>
            </div>

            {/* Auto Save Toggle */}
            <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-700">Auto Save</p>
                    <p className="text-xs text-gray-500">Automatically save changes</p>
                  </div>
                </div>
                <button onClick={toggleAutoSave} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${autoSave ? "bg-green-600" : "bg-gray-300"}`}>
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${autoSave ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-100 py-2">
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">System</p>
            </div>
            {quickActions.map((action, index) => (
              <button key={index} onClick={action.action} className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <action.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{action.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{action.value}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                // Navigate to full settings page
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3">
              <Palette className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">Advanced Settings</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
