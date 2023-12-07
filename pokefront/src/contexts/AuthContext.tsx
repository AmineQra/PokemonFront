import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (loginData: { login: string; password: string }) => Promise<void>;
  logout: () => void;
}
var auth;

if (sessionStorage.getItem("accessToken")) {
  auth = true;
}

const initialAuthState = {
  isAuthenticated: auth || false,
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
      const { trainerId, accessToken } = data;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("trainerId", trainerId);

      setAuthenticated(true);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("trainerId");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
