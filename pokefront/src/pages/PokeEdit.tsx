import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthCheck from "../hooks/AuthCheck";

const PokeEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useAuthCheck();

  const [pokemon, setPokemon] = useState<any>({
    species: "",
    name: "",
    level: "",
    genderTypeCode: "",
    size: "",
    weight: "",
    isShiny: false,
    trainerId: "",
  });

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/pokemons/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPokemon(data);
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
  }, [id]);

  const updatePoke = async () => {
    try {
      const response2 = await fetch(`http://localhost:8000/pokemons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(pokemon),
      });

      if (response2.ok) {
        navigate(-1);
      } else {
        const errorMessage = await response2.text();
        console.error(
          "Error fetching Pokemon detail:",
          response2.statusText,
          errorMessage
        );
      }
    } catch (error) {
      console.error("Error fetching Pokemon detail:", error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setPokemon((prevPokemon: any) => ({ ...prevPokemon, [field]: value }));
  };

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center bg-[#FFF9ED] rounded-lg shadow-lg p-6 w-96 opacity-90">
        <h2 className="text-2xl font-bold">{pokemon.name}'s Details</h2>
        <div className="mt-4">
          {["species", "name", "level", "size", "weight"].map((field) => (
            <div key={field} className="flex justify-center items-center pt-1">
              <label className="block mr-4 pr-4 w-12 text-right">
                <b>
                  {field === "size"
                    ? "Taille"
                    : field === "weight"
                    ? "Poids"
                    : field}
                  :
                </b>
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2"
                value={pokemon[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            </div>
          ))}
          <div className="flex justify-center items-center pt-1">
            <label className="block mr-4 pr-4 w-12 text-right">
              <b>Genre</b>
            </label>
            <select
              value={pokemon.genderTypeCode}
              onChange={(e) =>
                handleInputChange("genderTypeCode", e.target.value)
              }
              className="border border-gray-300 rounded-md p-2 w-[12.6rem]"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="NOT_DEFINED">Not Defined</option>
            </select>
          </div>
          <div className="flex justify-center items-center pt-1">
            <label className="block mr-4 pr-4 w-12 text-right">
              <b>Shiny:</b>
            </label>
            <input
              type="checkbox"
              className="border border-gray-300 rounded-md p-2"
              checked={pokemon.isShiny}
              onChange={(e) => handleInputChange("isShiny", e.target.checked)}
            />
          </div>
        </div>
        {pokemon.trainerId == sessionStorage.getItem("trainerId") && (
          <div className="mt-4">
            <button
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-gray-600"
              type="submit"
              onClick={updatePoke}
            >
              Sauvegarder
            </button>
          </div>
        )}
        <button
          className="mt-4 px-4 py-2 text-white bg-purple-500 rounded hover:bg-gray-600"
          onClick={handleReturn}
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default PokeEdit;
