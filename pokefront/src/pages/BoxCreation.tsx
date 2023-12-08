import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../hooks/AuthCheck";

const BoxCreation: React.FC = () => {
  const [boxName, setBoxName] = useState("");
  const navigate = useNavigate();

  useAuthCheck();

  const handleCreateBox = async () => {
    try {
      const trainerId = sessionStorage.getItem("trainerId");

      const response = await fetch(
        `http://localhost:8000/trainers/${trainerId}/boxes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ name: boxName }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate("/boxes");
    } catch (error) {
      console.error("Error creating box:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen opacity-95">
      <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-center items-center w-96">
        <h2 className="text-2xl font-bold mb-4">Création d'une Boîte</h2>
        <label className="mb-2">Nom de la boîte:</label>
        <input
          type="text"
          value={boxName}
          onChange={(e) => setBoxName(e.target.value)}
          placeholder="Nom de la boîte"
          className="border border-gray-300 rounded-md px-2 py-1 mb-2"
        />

        <button
          onClick={handleCreateBox}
          className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Créer la boîte
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 bg-purple-500 text-white px-4 py-2 rounded-md"
        >
          retour
        </button>
      </div>
    </div>
  );
};

export default BoxCreation;
