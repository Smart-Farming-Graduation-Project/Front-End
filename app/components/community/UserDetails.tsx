"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import API_BASE_URL from "@/app/utils/api/base";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import defaultAvatar from "@/app/assets/images/abdo.jpg";

const userCache: Record<string, { firstName: string; lastName: string; imageUrl: string | null }> = {};

interface UserDetailsProps {
  userId: string;
  showTimestamp?: boolean;
  timestamp?: string;
  imageSize?: number;
}

const UserDetails = ({ userId, showTimestamp = false, timestamp, imageSize = 32 }: UserDetailsProps) => {
  const [userData, setUserData] = useState<{ 
    firstName: string; 
    lastName: string; 
    imageUrl: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      
      // Return cached data if available
      if (userCache[userId]) {
        setUserData(userCache[userId]);
        setIsLoading(false);
        return;
      }
      
      try {
        const token = getTokenClient();
        if (!token) return;
        
        const response = await axios.get(`${API_BASE_URL}/User/GetById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data && response.data.data) {
          const user = {
            firstName: response.data.data.firstName || '',
            lastName: response.data.data.lastName || '',
            imageUrl: response.data.data.imageUrl || null
          };
          
          // Cache the user data
          userCache[userId] = user;
          setUserData(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId]);

  const fullName = userData 
    ? `${userData.firstName} ${userData.lastName}`.trim() || "Unknown User" 
    : isLoading ? "Loading..." : "Unknown User";

  // Determine which image to use
  const getImageSrc = () => {
    if (imageError || !userData?.imageUrl) {
      return defaultAvatar;
    }
    return userData.imageUrl;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative rounded-full overflow-hidden bg-gray-100`} style={{ width: imageSize, height: imageSize }}>
        <Image 
          src={getImageSrc()}
          alt={`${fullName}'s avatar`} 
          fill
          className="object-cover"
          onError={handleImageError}
          sizes={`${imageSize}px`}
          priority={imageSize >= 40}
        />
      </div>
      <div>
        <span className="font-medium text-[#1f2937] text-sm">{fullName}</span>
        {showTimestamp && timestamp && (
          <span className="block text-xs text-[#6b7280]">{timestamp}</span>
        )}
      </div>
    </div>
  );
};

export default UserDetails;