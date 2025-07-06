import axios from "axios";
import API_BASE_URL from "./base";
import { getTokenServer } from "./getTokenServer";
import { getTokenClient } from "./getTokenClient";

// Use a function that safely gets the token based on context
const getToken = () => {
  // Try client-side first (works in both environments)
  const clientToken = typeof window !== "undefined" ? getTokenClient() : null;

  // If no client token, try server token
  if (!clientToken) {
    return getTokenServer();
  }

  return clientToken;
};

// Replace ProductsList with MostSells
export const getMostSells = async () => {
  const token = getToken();

  try {
    const response = await axios.get(`${API_BASE_URL}/Product/ProductsList`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
    // Limit to 10 products
    return response.data.data?.slice(0, 10) || [];
  } catch (error) {
    console.error("Error fetching mostSells:", error);
    return [];
  }
};

// Get Product by Id
export const getProductById = async (id: number) => {
  const token = getToken();

  try {
    const response = await axios.get(`${API_BASE_URL}/Product/product/${id}`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Get AvgRatign by Id
export const getAvgProduct = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Product/product/${id}`);
    return response.data.data.averageRating || 3.5;
  } catch (error) {
    console.error("Error fetching getAvgProduct:", error);
    return 3.5;
  }
};
