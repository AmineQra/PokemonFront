import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../hooks/AuthCheck";

const AddPoke: React.FC = () => {
  const [species, setSpecies] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("MALE");
  const [level, setLevel] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [isShiny, setIsShiny] = useState(false);
  const navigate = useNavigate();

  useAuthCheck();

  const handleCreatePokemon = async () => {
    try {
      const response = await fetch(`http://localhost:8000/pokemons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          species: species,
          name: name,
          genderTypeCode: gender,
          level: Number(level),
          size: Number(height),
          weight: Number(weight),
          isShiny: isShiny,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate("/pokemons");
    } catch (error) {
      console.error("Error creating poekmon:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center bg-[#FFF9ED] p-4 rounded opacity-95 w-96">
        <h1 className="text-3xl font-bold mb-4 p-2">Ajouter un Pokémon</h1>

        <div className="flex justify-center items-center w-96 m-2">
          <label className="block mr-4 pr-4 w-12 text-right">Espèce</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex justify-center items-center w-96 m-2">
          <label className="block mr-4 pr-4 w-12 text-right">Nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex justify-center items-center w-96 m-2">
          <label className="block mr-4 pr-4 w-12 text-right">Genre</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-52"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="NOT_DEFINED">Not Defined</option>
          </select>
        </div>

        <div className="flex justify-center items-center w-96 m-2">
          <label className="block mr-4 pr-4 w-12 text-right">Niveau</label>
          <input
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex justify-center items-center w-96 m-2">
          <label className="block mr-4 pr-4 w-12 text-right">Taille</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex justify-center items-center w-96 m-2">
          <label className="block mr-4 pr-4 w-12 text-right">Poids</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex justify-center items-center w-96 m-2">
          <label className="mr-2">Chromatique</label>
          <input
            type="checkbox"
            checked={isShiny}
            onChange={(e) => setIsShiny(e.target.checked)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <br></br>
        <button
          onClick={handleCreatePokemon}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Créer le Pokémon
        </button>
      </div>
    </div>
  );
};

export default AddPoke;
