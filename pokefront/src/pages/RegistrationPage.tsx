// RegistrationPage.tsx
import React, { useState } from "react";

const RegistrationPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    try {
      fetch("http://localhost:8000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          login: login,
          birthDate: birthdate,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error during fetch:", error);
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen opacity-90">
      <div className="bg-[#FFF9ED] p-8 rounded shadow-md w-96 border border-gray-200">
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
            Nom d&lsquo;utilisateur:
            <input
              type="text"
              value={login}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </label>
          <label className="block mb-2">
            Date de naissance:
            <input
              type="date"
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
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            S&lsquo;inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
