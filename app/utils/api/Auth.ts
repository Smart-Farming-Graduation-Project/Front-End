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

export const registerWithThirdParty = async (provider: "google" | "facebook", idToken: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Authentication/register-with-third-party`, {
      provider,
      token: idToken,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || [{ message: "An unexpected error occurred." }];
    }
    throw [{ message: "An unexpected error occurred." }];
  }
};
export const loginWithThirdParty = async (provider: "google" | "facebook", idToken: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Authentication/login-with-third-party`, {
      provider,
      token: idToken,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || [{ message: "An unexpected error occurred." }];
    }
    throw [{ message: "An unexpected error occurred." }];
  }
};
