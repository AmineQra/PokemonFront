import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await authLogin({ login, password });
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Connexion à PokéApp</h2>
        <form>
          <label className="block mb-2">
            Nom d&lsquo;utilisateur:
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </label>
          <label className="block mb-2">
            Mot de Passe:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </label>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
