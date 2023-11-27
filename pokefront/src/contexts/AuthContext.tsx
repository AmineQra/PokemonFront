import React, { createContext, useContext, useState } from "react";
import NotificationProps from "../components/Notification";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (loginData: { login: string; password: string }) => Promise<void>;
  logout: () => void;
}

const initialAuthState = {
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps | undefined>(
  initialAuthState
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  const login = async (loginData: { login: string; password: string }) => {
    try {
      // Replace this with your actual login API endpoint
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = await response.json();
      const { accessToken } = data;

      sessionStorage.setItem("accessToken", accessToken);

      setNotification({ message: "Login successful", type: "success" });

      setAuthenticated(true);
    } catch (error) {
      console.error("Error during login:", error);
      setNotification({ message: "Login failed", type: "error" });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setNotification({ message: "Logout successful", type: "success" });
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
      {notification && (
        <NotificationProps
          message={notification.message}
          type={notification.type}
        />
      )}
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
