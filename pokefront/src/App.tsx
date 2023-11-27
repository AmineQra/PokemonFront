import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import "./index.css";
import BoxPage from "./pages/BoxPage";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/boxes"
            element={<BoxPage boxes={[]} isUserBoxes={true} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
