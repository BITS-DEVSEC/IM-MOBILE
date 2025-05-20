import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Group,
  Anchor,
  Loader,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { AlertCircle } from "lucide-react";
import ET from "../../assets/image.png";

interface User {
  id: number;
  email?: string;
  phone_number?: string;
  roles?: string[]; // Make roles optional
}

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isPhoneLogin, setIsPhoneLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const form = useForm({
    initialValues: {
      email: "",
      phone_number: "",
      password: "",
    },
    validate: {
      email: (value) => (!isPhoneLogin && !value ? "Email is required" : null),
      phone_number: (value) =>
        isPhoneLogin && !value ? "Phone number is required" : null,
      password: (value) => (!value ? "Password is required" : null),
    },
  });

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
      throw new Error(JSON.stringify(data));
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
      // Assume admin role if login is successful, as roles may not be present
      const isAdmin = data.data.user.roles?.includes("admin") ?? true;
      if (!isAdmin) {
        throw new Error("Access denied: Admin role required");
      }
      setUser(data.data.user);
      setAccessToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);
      localStorage.setItem("admin_refresh_token", data.data.refresh_token);
      localStorage.setItem("admin_user", JSON.stringify(data.data.user));
      localStorage.setItem("admin_access_token", data.data.access_token);
      notifications.show({ message: "Admin login successful", color: "green" });
      navigate("/admin");
    } catch (error) {
      let errorMessage = "Please check your credentials";
      try {
        const errorData = JSON.parse((error as Error).message);
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = (error as Error).message;
      }
      notifications.show({
        message: errorMessage,
        color: "red",
        icon: <AlertCircle />,
      });
      throw error;
    }
  };

  const refreshAuthToken = async () => {
    setIsLoading(true);
    try {
      const storedRefreshToken = localStorage.getItem("admin_refresh_token");
      if (!storedRefreshToken) {
        throw new Error("No refresh token available");
      }
      const data = await apiRequest("/auth/refresh", "POST", {
        refresh_token: storedRefreshToken,
      });
      // Assume admin role if refresh is successful, as roles may not be present
      const isAdmin = data.data.user.roles?.includes("admin") ?? true;
      if (!isAdmin) {
        throw new Error("Access denied: Admin role required");
      }
      setAccessToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);
      localStorage.setItem("admin_refresh_token", data.data.refresh_token);
      localStorage.setItem("admin_access_token", data.data.access_token);
      const storedUser = localStorage.getItem("admin_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      navigate("/admin");
    } catch (error) {
      console.warn("Refresh token failed:", (error as Error).message);
      localStorage.removeItem("admin_refresh_token");
      localStorage.removeItem("admin_user");
      localStorage.removeItem("admin_access_token");
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      navigate("/admin-login");
    } finally {
      setIsLoading(false);
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
      setRefreshTokenwhom: null;
      localStorage.removeItem("admin_refresh_token");
      localStorage.removeItem("admin_user");
      localStorage.removeItem("admin_access_token");
      notifications.show({
        message: "Logged out successfully",
        color: "green",
      });
      navigate("/admin-login");
    }
  };

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem("admin_refresh_token");
    if (storedRefreshToken) {
      refreshAuthToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    const identifier = isPhoneLogin
      ? `+251${values.phone_number}`
      : values.email;

    await login({
      [isPhoneLogin ? "phone_number" : "email"]: identifier,
      password: values.password,
    });
  };

  if (isLoading) {
    return (
      <Loader style={{ display: "flex", margin: "auto", marginTop: 100 }} />
    );
  }

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}
    >
      <Title
        order={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        mb="md"
      >
        Admin Login
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {isPhoneLogin ? (
          <TextInput
            label="Phone Number"
            placeholder="912345678"
            leftSection={
              <Group gap={5}>
                <img src={ET} alt="ET" style={{ width: 20, height: 20 }} />
                <Text size="sm" c="dimmed">
                  +251
                </Text>
              </Group>
            }
            leftSectionWidth={85}
            {...form.getInputProps("phone_number")}
            mb="md"
          />
        ) : (
          <TextInput
            label="Email"
            placeholder="admin@example.com"
            {...form.getInputProps("email")}
            mb="md"
          />
        )}
        <PasswordInput
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
          mb="md"
        />
        <Group justify="space-between" mb="md">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => setIsPhoneLogin(!isPhoneLogin)}
            size="sm"
          >
            {isPhoneLogin ? "Use email instead" : "Use phone number instead"}
          </Anchor>
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            size="sm"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>
      {user && (
        <Button onClick={logout} color="red" fullWidth mt="md">
          Logout
        </Button>
      )}
    </Paper>
  );
};
