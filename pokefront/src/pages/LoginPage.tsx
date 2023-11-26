// LoginPage.tsx
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Send data to the backend for verification and login
      // If successful, redirect the user to the main page
      // You can use the useHistory hook from React Router for this
      // Example: history.push('/home');
    } catch (error) {
      // Handle login errors, display a message to the user, etc.
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Connexion à PokéApp</h2>
        <form>
          <label className="block mb-2">
            Nom d'utilisateur:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
