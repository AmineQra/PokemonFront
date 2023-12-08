import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthCheck from "../hooks/AuthCheck";

const BoxEdit: React.FC = () => {
  const [boxName, setBoxName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useAuthCheck();

  useEffect(() => {
    const getboxname = async () => {
      try {
        const trainerId = sessionStorage.getItem("trainerId");

        const response = await fetch(
          `http://localhost:8000/trainers/${trainerId}/boxes/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          const data = await response.json();
          setBoxName(data.name);
        }
      } catch (error) {
        console.error("Error creating box:", error);
      }
    };
    getboxname();
  }, [id]);

  const UpdateBox = async () => {
    try {
      const trainerId = sessionStorage.getItem("trainerId");

      const response = await fetch(
        `http://localhost:8000/trainers/${trainerId}/boxes/${id}`,
        {
          method: "PATCH",
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
        <h2 className="text-2xl font-bold mb-4">Modifier la box</h2>
        <label className="mb-2">Nom de la boîte:</label>
        <input
          type="text"
          value={boxName}
          onChange={(e) => setBoxName(e.target.value)}
          placeholder="Nom de la boîte"
          className="border border-gray-300 rounded-md px-2 py-1 mb-2"
        />

        <button
          onClick={UpdateBox}
          className="mt-8 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Sauvegarder
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

export default BoxEdit;
