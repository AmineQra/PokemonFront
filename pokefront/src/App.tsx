import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import "./index.css";
import BoxPage from "./pages/BoxPage";
import BoxCreation from "./components/BoxCreation";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import { useAuth } from "./contexts/AuthContext";
import BoxDetail from "./components/BoxDetail";
import PokePage from "./pages/PokePage";
import AddPoke from "./components/AddPoke";
import PokeDetail from "./components/PokeDetail";
import PokeEdit from "./components/PokeEdit";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <AuthProvider>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/boxes" element={<BoxPage />} />
          <Route path="/create-box" element={<BoxCreation />} />
          <Route path="/box/:id" element={<BoxDetail />} />
          <Route path="/pokemons" element={<PokePage />} />
          <Route path="/poke/:id" element={<PokeDetail />} />
          <Route path="/edit-pokemon/:id" element={<PokeEdit />} />
          <Route path="/add-poke" element={<AddPoke />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
