import { notifications } from "@mantine/notifications";
import { AlertCircle } from "lucide-react";
import { apiRequest } from "./api";
import { handleApiError } from "../utils/errorHandler";

interface User {
  id: number;
  email?: string;
  phone_number?: string;
  roles: string[];
}

export interface AuthResponse {
  data: {
    user: User;
    access_token: string;
  };
}

export const authService = {
  login: async (credentials: {
    email?: string;
    phone_number?: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      const data = await apiRequest<AuthResponse>(
        "/auth/login",
        "POST",
        credentials
      );
      notifications.show({ message: "Login successful", color: "green" });
      return data;
    } catch (error) {
      const message = handleApiError(error, "An error occurred during login");
      notifications.show({ message, color: "red", icon: <AlertCircle /> });
      throw new Error(message);
    }
  },

  logout: async (token: string | null): Promise<void> => {
    try {
      if (token) {
        await apiRequest("/auth/logout", "DELETE", null, token);
      }
    } catch (error) {
      console.warn("Logout failed:", (error as Error).message);
    }
    notifications.show({ message: "Logged out successfully", color: "green" });
  },

  registerCustomer: async (data: {
    phone_number: string;
    fin: string;
    password: string;
    password_confirmation: string;
  }): Promise<void> => {
    try {
      await apiRequest("/auth/customer_register", "POST", data);
      notifications.show({ message: "OTP sent successfully", color: "green" });
    } catch (error) {
      const message = handleApiError(
        error,
        "An error occurred during registration"
      );
      notifications.show({ message, color: "red", icon: <AlertCircle /> });
      throw new Error(message);
    }
  },

  registerUser: async (data: {
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }): Promise<void> => {
    try {
      await apiRequest("/auth/register", "POST", data);
      notifications.show({
        message: "Registration successful. Please verify your email.",
        color: "green",
      });
    } catch (error) {
      const message = handleApiError(
        error,
        "An error occurred during registration"
      );
      notifications.show({ message, color: "red", icon: <AlertCircle /> });
      throw new Error(message);
    }
  },

  verifyOtp: async (data: {
    phone_number: string;
    otp: string;
  }): Promise<AuthResponse> => {
    try {
      const response = await apiRequest<AuthResponse>(
        "/auth/verify_otp",
        "POST",
        data
      );
      notifications.show({
        message: "OTP verified successfully",
        color: "green",
      });
      return response;
    } catch (error) {
      const message = handleApiError(
        error,
        "An error occurred during OTP verification"
      );
      notifications.show({ message, color: "red", icon: <AlertCircle /> });
      throw new Error(message);
    }
  },

  verifyEmail: async (data: {
    email: string;
    verification_token: string;
  }): Promise<void> => {
    try {
      await apiRequest("/auth/verify_email", "POST", data);
      notifications.show({
        message: "Email verified successfully",
        color: "green",
      });
    } catch (error) {
      const message = handleApiError(
        error,
        "An error occurred during email verification"
      );
      notifications.show({ message, color: "red", icon: <AlertCircle /> });
      throw new Error(message);
    }
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      await apiRequest("/auth/forgot_password", "POST", { email });
      notifications.show({
        message: "Password reset instructions sent",
        color: "green",
      });
    } catch (error) {
      const message = handleApiError(
        error,
        "An error occurred during password reset"
      );
      notifications.show({ message, color: "red", icon: <AlertCircle /> });
      throw new Error(message);
    }
  },

  resetPassword: async (data: {
    email: string;
    reset_token: string;
    password: string;
    password_confirmation: string;
  }): Promise<void> => {
    try {
      await apiRequest("/auth/reset_password", "POST", data);
      notifications.show({
        message: "Password reset successfully",
        color: "green",
      });
    } catch (error) {
      const message = handleApiError(
        error,
        "An error occurred during password reset"
      );
      notifications.show({ message, color: "red", icon: <AlertCircle /> });
      throw new Error(message);
    }
  },

  refreshAuthToken: async (): Promise<AuthResponse> => {
    try {
      const data = await apiRequest<AuthResponse>(
        "/auth/refresh",
        "POST",
        null
      );
      return data;
    } catch (error) {
      const message = handleApiError(
        error,
        "Session expired or server unavailable"
      );
      throw new Error(message);
    }
  },
};
