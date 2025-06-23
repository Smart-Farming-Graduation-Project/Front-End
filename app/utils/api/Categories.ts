import axios from "axios";
import API_BASE_URL from "./base";
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Category/CategoryList`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
