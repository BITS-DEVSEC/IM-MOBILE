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
import { jwtDecode } from "jwt-decode";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      import.meta.env.VITE_API_BASE_URL || "history://localhost:3000";
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return data;
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        throw new Error("Server is down or unreachable");
      }
      throw error;
    }
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
        accessToken || undefined
      );
    } catch (error) {
      console.warn("Logout failed:", (error as Error).message);
    } finally {
      setUser(null);
      setAccessToken(null);
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
      const data = await apiRequest("/auth/refresh", "POST", null);
      setAccessToken(data.data.access_token);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.warn("Refresh token failed:", (error as Error).message);
      if (
        (error as Error).message.includes("401") ||
        (error as Error).message.includes("Server is down")
      ) {
        localStorage.removeItem("user");
        setUser(null);
        setAccessToken(null);
        notifications.show({
          message:
            "Session expired or server unavailable. Please log in again.",
          color: "red",
          icon: <AlertCircle />,
        });
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Token refresh logic
  useEffect(() => {
    let refreshInterval: ReturnType<typeof setInterval>;

    const checkAndRefreshToken = async () => {
      if (accessToken) {
        try {
          const decoded: { exp: number } = jwtDecode(accessToken);
          const currentTime = Math.floor(Date.now() / 1000);
          const timeLeft = decoded.exp - currentTime;

          // Refresh token 10 seconds before expiration
          if (timeLeft <= 10) {
            await refreshAuthToken();
          }
        } catch (error) {
          console.warn("Token decode failed:", (error as Error).message);
          await refreshAuthToken();
        }
      }
    };

    if (accessToken) {
      // Check every 10 seconds
      refreshInterval = setInterval(checkAndRefreshToken, 10 * 1000);
    }

    return () => clearInterval(refreshInterval);
  }, [accessToken]);

  // Initial token check
  useEffect(() => {
    refreshAuthToken();
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
