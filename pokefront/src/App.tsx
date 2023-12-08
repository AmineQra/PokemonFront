import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import "./index.css";
import BoxPage from "./pages/BoxPage";
import BoxCreation from "./pages/BoxCreation";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import { useAuth } from "./contexts/AuthContext";
import BoxDetail from "./pages/BoxDetail";
import PokePage from "./pages/PokePage";
import AddPoke from "./pages/AddPoke";
import PokeDetail from "./pages/PokeDetail";
import PokeEdit from "./pages/PokeEdit";
import Trades from "./pages/Trades";
import TrainerPage from "./pages/TrainerPage";
import BoxEdit from "./pages/BoxEdit";
import PokeSwitch from "./pages/PokeSwitch";
import UserProfile from "./pages/UserProfile";
import UpdateUser from "./pages/UpdateUser";
import TrainerProfile from "./pages/TrainerProfile";

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
          <Route path="/move-poke/:id" element={<PokeSwitch />} />
          <Route path="/edit-box/:id" element={<BoxEdit />} />
          <Route path="/box/:id" element={<BoxDetail />} />
          <Route path="/pokemons" element={<PokePage />} />
          <Route path="/poke/:id" element={<PokeDetail />} />
          <Route path="/edit-pokemon/:id" element={<PokeEdit />} />
          <Route path="/add-poke" element={<AddPoke />} />
          <Route path="/exchanges" element={<Trades />} />
          <Route path="/trainer" element={<TrainerPage />} />
          <Route path="/trainer/:id" element={<TrainerProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
