import axios from "axios";
import API_BASE_URL from "./base";
// replace ProductsList with MostSells
// server component
export const getMostSells = async (token: string) => {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(`${API_BASE_URL}/Product/ProductsList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching mostSells:", error);
  }
};

// Get Product by Id
export const getProductById = async (id: number, token: string) => {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(`${API_BASE_URL}/Product/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product by id 5555555:", error);
    return null;
  }
};

// Get AvgRatign by Id
export const getAvgProduct = async (id: number, token: string) => {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(`${API_BASE_URL}/Product/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.averageRating || 3.5;
  } catch (error) {
    console.error("Error fetching getAvgProduct:", error);
  }
};
