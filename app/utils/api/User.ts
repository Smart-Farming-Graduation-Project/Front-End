import axios from "axios";
import API_BASE_URL from "./base";

export interface UserProfile {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string;
}

export const getUserById = async (id: string, token: string): Promise<UserProfile> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/User/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.succeeded) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
