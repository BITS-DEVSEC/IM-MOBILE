import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  role: "admin" | "customer" | "insurer";
  id: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Change to your role
  const [user] = useState<User>({
    role: "insurer",
    id: "user1",
  });

  const login = (userData: User) => {
    console.log("Login called:", userData);
  };

  const logout = () => {
    console.log("Logout called");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: true }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
