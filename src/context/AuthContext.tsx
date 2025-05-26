import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { AlertCircle } from "lucide-react";

interface User {
  id: number;
  email?: string;
  phone_number?: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: {
    email?: string;
    phone_number?: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  registerCustomer: (data: {
    phone_number: string;
    fin: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void>;
  registerUser: (data: {
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }) => Promise<void>;
  verifyOtp: (data: { phone_number: string; otp: string }) => Promise<void>;
  verifyEmail: (data: {
    email: string;
    verification_token: string;
  }) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: {
    email: string;
    reset_token: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void>;
  refreshAuthToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize as loading
  const navigate = useNavigate();

  const apiRequest = async (
    url: string,
    method: string,
    body?: string | object | null,
    token?: string
  ) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(data)); // Pass the entire error data as a string
    }
    return data;
  };

  const login = async (credentials: {
    email?: string;
    phone_number?: string;
    password: string;
  }) => {
    try {
      const data = await apiRequest("/auth/login", "POST", credentials);
      setUser(data.data.user);
      setAccessToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      notifications.show({ message: "Login successful", color: "green" });
      navigate("/dashboard");
    } catch (error) {
      let errorMessage = "An error occurred during login";
      try {
        const errorData = JSON.parse((error as Error).message);
        if (
          errorData.error === "Unauthorized" ||
          errorData.error === "Invalid credentials"
        ) {
          errorMessage = "Please check your phone number or password again";
        } else {
          errorMessage =
            errorData.error ||
            errorData.message ||
            "An error occurred during login";
        }
      } catch (parseError) {
        errorMessage = (error as Error).message;
      }
      notifications.show({
        message: errorMessage,
        color: "red",
        icon: <AlertCircle />,
      });
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await apiRequest(
        "/auth/logout",
        "DELETE",
        null,
        refreshToken || accessToken || undefined
      );
    } catch (error) {
      console.warn("Logout failed:", (error as Error).message);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      notifications.show({
        message: "Logged out successfully",
        color: "green",
      });
      navigate("/login");
    }
  };

  const registerCustomer = async (data: {
    phone_number: string;
    fin: string;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      await apiRequest("/auth/customer_register", "POST", data);
      notifications.show({ message: "OTP sent successfully", color: "green" });
      // Encode phone number to preserve "+"
      navigate(`/verify-otp?phone=${encodeURIComponent(data.phone_number)}`);
    } catch (error) {
      let errorMessage = "An error occurred during registration";
      try {
        const errorData = JSON.parse((error as Error).message);
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors.join(", ");
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (parseError) {
        errorMessage = (error as Error).message;
      }
      notifications.show({
        message: errorMessage,
        color: "red",
        icon: <AlertCircle />,
      });
      throw new Error(errorMessage);
    }
  };

  const registerUser = async (data: {
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }) => {
    try {
      await apiRequest("/auth/register", "POST", data);
      notifications.show({
        message: "Registration successful. Please verify your email.",
        color: "green",
      });
      navigate("/login");
    } catch (error) {
      notifications.show({
        message: (error as Error).message,
        color: "red",
        icon: <AlertCircle />,
      });
      throw error;
    }
  };

  const verifyOtp = async (data: { phone_number: string; otp: string }) => {
    try {
      const response = await apiRequest("/auth/verify_otp", "POST", data);
      setUser(response.data.user);
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      notifications.show({
        message: "OTP verified successfully",
        color: "green",
      });
      navigate("/dashboard");
    } catch (error) {
      notifications.show({
        message: (error as Error).message,
        color: "red",
        icon: <AlertCircle />,
      });
      throw error;
    }
  };

  const verifyEmail = async (data: {
    email: string;
    verification_token: string;
  }) => {
    try {
      await apiRequest("/auth/verify_email", "POST", data);
      notifications.show({
        message: "Email verified successfully",
        color: "green",
      });
      navigate("/login");
    } catch (error) {
      notifications.show({
        message: (error as Error).message,
        color: "red",
        icon: <AlertCircle />,
      });
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await apiRequest("/auth/forgot_password", "POST", { email });
      notifications.show({
        message: "Password reset instructions sent",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        message: (error as Error).message,
        color: "red",
        icon: <AlertCircle />,
      });
      throw error;
    }
  };

  const resetPassword = async (data: {
    email: string;
    reset_token: string;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      await apiRequest("/auth/reset_password", "POST", data);
      notifications.show({
        message: "Password reset successfully",
        color: "green",
      });
      navigate("/login");
    } catch (error) {
      notifications.show({
        message: (error as Error).message,
        color: "red",
        icon: <AlertCircle />,
      });
      throw error;
    }
  };

  const refreshAuthToken = async () => {
    setIsLoading(true);
    try {
      const storedRefreshToken = localStorage.getItem("refresh_token");
      if (!storedRefreshToken) {
        throw new Error("No refresh token available");
      }
      const data = await apiRequest("/auth/refresh", "POST", {
        refresh_token: storedRefreshToken,
      });
      setAccessToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.warn("Refresh token failed:", (error as Error).message);
      if ((error as Error).message.includes("401")) {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem("refresh_token");
    if (storedRefreshToken) {
      refreshAuthToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user && !!accessToken,
        isLoading,
        login,
        logout,
        registerCustomer,
        registerUser,
        verifyOtp,
        verifyEmail,
        forgotPassword,
        resetPassword,
        refreshAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
