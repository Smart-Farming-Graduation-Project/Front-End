import axios from "axios";
import API_BASE_URL from "./base";

export const registerUser = async (userData: { email: string; password: string; confirmPassword: string; firstName: string; lastName: string; userName: string; phone: string; address: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Authentication/Register`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw error.response?.data || { Message: "An unexpected error occurred." };
    }
    throw [{ Message: "An unexpected error occurred." }];
  }
};

export const loginUser = async (userData: { userNameOrEmail: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Authentication/SignIn`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw error.response?.data || { message: "An unexpected error occurred." };
    }
    throw [{ Message: "An unexpected error occurred." }];
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Authentication/forgot-username-or-password`, { email });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw error.response?.data || [{ Message: "An unexpected error occurred." }];
    }
    throw [{ Message: "An unexpected error occurred." }];
  }
};
export const resetPassword = async (token: string, email: string, newPassword: string, confirmPassword: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Authentication/reset-password`, {
      token,
      email,
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw error.response?.data || [{ Message: "An unexpected error occurred." }];
    }
    throw [{ Message: "An unexpected error occurred." }];
  }
};

export const confirmEmail = async (email: string, token: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Authentication/confirm-email`, {
      email,
      token,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error confirming email:", error.response?.data);
      throw error.response?.data || [{ Message: "An unexpected error occurred." }];
    }
    throw [{ Message: "An unexpected error occurred." }];
  }
};
export const resendConfirmationEmail = async (email: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Authentication/resend-email-confirmation`, {
      email,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error resending confirmation email:", error.response?.data);
      throw error.response?.data || [{ Message: "An unexpected error occurred." }];
    }
    throw [{ Message: "An unexpected error occurred." }];
  }
};

export const refreshToken = async (accessToken: string, refreshTokenValue: string) => {
  try {
    console.log("Making refresh token request...");
    console.log("Request payload:", {
      tokens: {
        accessToken,
        refreshToken: refreshTokenValue
      }
    });
    
    const response = await axios.post(`${API_BASE_URL}/Authentication/RefreshToken`, {
      tokens: {
        accessToken,
        refreshToken: refreshTokenValue
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });
// to test refresh token
    // console.log("Refresh token response status:", response.status);
    // console.log("Refresh token response data:", response.data);
    // console.log("Response structure:", JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Refresh token error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      // If refresh token is invalid or expired, throw specific error
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw { 
          statusCode: error.response.status,
          message: "Refresh token expired or invalid",
          data: error.response.data 
        };
      }
      
      throw { 
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to refresh authentication tokens.",
        data: error.response?.data 
      };
    }
    
    console.error("Non-axios error during token refresh:", error);
    throw { 
      statusCode: 500,
      message: "An unexpected error occurred while refreshing tokens.",
      data: null 
    };
  }
};