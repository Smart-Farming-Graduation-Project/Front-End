"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getTokenClient } from "../api/getTokenClient";
import API_BASE_URL from "../api/base";

interface UserData {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string | null;
}

export const useUserData = (userId: string | undefined) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      const token = getTokenClient();
      if (!token) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/User/GetById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.succeeded) {
          setUserData(response.data.data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return { userData, isLoading, error };
};
