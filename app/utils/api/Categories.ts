import axios from "axios";
import API_BASE_URL from "./base";
export const getCategories = async (token: string) => {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(`${API_BASE_URL}/Category/CategoryList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
