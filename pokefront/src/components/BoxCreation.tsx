// BoxCreationPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const BoxCreation: React.FC = () => {
  const [boxName, setBoxName] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }

  const handleCreateBox = async () => {
    try {
      // Replace with the actual trainerId
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

      // Box created successfully, redirect to the box list page
      navigate("/boxes");
    } catch (error) {
      console.error("Error creating box:", error);
    }
  };

  return (
    <div>
      <h2>Création d&lsquo;une Boîte</h2>
      <label>Nom de la boîte:</label>
      <input
        type="text"
        value={boxName}
        onChange={(e) => setBoxName(e.target.value)}
        placeholder="Nom de la boîte"
      />

      <button onClick={handleCreateBox}>Créer la boîte</button>
    </div>
  );
};

export default BoxCreation;
