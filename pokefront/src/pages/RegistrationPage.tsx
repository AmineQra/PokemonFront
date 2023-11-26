// RegistrationPage.tsx
import React, { useState } from "react";

const RegistrationPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    try {
      // Send data to the backend for registration
      // If successful, redirect the user to the main page
      // You can use the useHistory hook from React Router for this
      // Example: history.push('/home');
    } catch (error) {
      // Handle registration errors, display a message to the user, etc.
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Inscription à PokéApp</h2>
        <form>
          <label className="block mb-2">
            Prénom:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </label>
          <label className="block mb-2">
            Nom de famille:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </label>
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
            Date de naissance:
            <input
              type="text"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </label>
          <label className="block mb-2">
            Mot de passe:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </label>
          <button
            type="button"
            onClick={handleRegistration}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
