import axios from "axios";
import API_BASE_URL from "./base";
// replace ProductsList with MostSells
// server component
export const getMostSells = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Product/ProductsList`);
    // Limit to 10 products
    return response.data.data?.slice(0, 10) || [];
  } catch (error) {
    console.error("Error fetching mostSells:", error);
    return [];
  }
};

// Get Product by Id
export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Product/product/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product by id 5555555:", error);
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
  }
};
