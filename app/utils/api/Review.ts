import API_BASE_URL from "./base";
import axios from "axios";

export const getReviews = async (productId: number, token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Reviews/GetReviews/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }
};

export const createReview = async (productId: number, rating: number, reviewText: string, headline: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/Reviews/CreateReview`,
      {
        productID: productId,
        rating,
        reviewText,
        headline,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to add review: Unexpected response status");
    }
  } catch (error) {
    console.error("Failed to add review:", error);
    throw error;
  }
};
export const deleteReview = async (reviewId: number, token: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Reviews/DeleteReview/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete review:", error);
  }
};

export const updateReview = async (reviewId: number, updatedReview: { rating: number; reviewText: string; headline: string }, token: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Reviews/UpdateReview/${reviewId}`, updatedReview, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update review:", error);
  }
};
