import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { AlertCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { authService } from "../services/authService";

interface UseTokenRefreshProps {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
}

interface User {
  id: number;
  email?: string;
  phone_number?: string;
  roles: string[];
}

export const useTokenRefresh = ({
  accessToken,
  setAccessToken,
  setUser,
  setIsLoading,
}: UseTokenRefreshProps) => {
  const navigate = useNavigate();

  const refreshAuthToken = async () => {
    setIsLoading(true);
    try {
      const data = await authService.refreshAuthToken();
      setAccessToken(data.data.access_token);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.warn("Refresh token failed:", (error as Error).message);
      localStorage.removeItem("user");
      setUser(null);
      setAccessToken(null);
      notifications.show({
        message: "Session expired or server unavailable. Please log in again.",
        color: "red",
        icon: <AlertCircle />,
      });
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let refreshInterval: ReturnType<typeof setInterval>;

    const checkAndRefreshToken = async () => {
      if (accessToken) {
        try {
          const decoded: { exp: number } = jwtDecode(accessToken);
          const currentTime = Math.floor(Date.now() / 1000);
          const timeLeft = decoded.exp - currentTime;

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
      refreshInterval = setInterval(checkAndRefreshToken, 10 * 1000);
    }

    return () => clearInterval(refreshInterval);
  }, [accessToken]);

  useEffect(() => {
    refreshAuthToken();
  }, []);
};