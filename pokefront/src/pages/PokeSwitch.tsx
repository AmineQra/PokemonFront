import React, { useEffect, useState } from "react";
import useAuthCheck from "../hooks/AuthCheck";
import { useNavigate, useParams } from "react-router-dom";

const PokeSwitch: React.FC = () => {
  useAuthCheck();
  const { id } = useParams();
  const [selectedboxId, setSelectedboxId] = useState("");
  const [boxData, setBoxData] = useState<any>([]);
  const trainerId = sessionStorage.getItem("trainerId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/trainers/${trainerId}/boxes`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBoxData(data);
        } else {
          const errorMessage = await response.text();
          console.error(
            "Error fetching Pokemon detail:",
            response.statusText,
            errorMessage
          );
        }
      } catch (error) {
        console.error("Error fetching Pokemon detail:", error);
      }
    };

    fetchPokemonDetail();
  }, []);

  const handleUpdatePokeBox = (event: any) => {
    setSelectedboxId(event.target.value);
  };

  const handleUpdatePokemon = async () => {
    try {
      const response = await fetch(`http://localhost:8000/pokemons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          boxId: Number(selectedboxId),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        navigate("/box/" + selectedboxId);
      }
    } catch (error) {
      console.error("Error updating pokemon:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen opacity-95">
      <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-center items-center w-96">
        <h2 className="text-2xl font-bold mb-4">Choisir une Boite</h2>
        <select
          value={selectedboxId}
          onChange={handleUpdatePokeBox}
          className="px-4 py-2 text-black rounded border border-black"
        >
          <option disabled value="1">
            choisir une boite
          </option>
          {boxData.map((box: any) => (
            <option key={box.id} value={box.id}>
              {box.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleUpdatePokemon}
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

export default PokeSwitch;
