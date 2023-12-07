import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PokeEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    console.log(pokemon);
    try {
      const response = await fetch(`http://localhost:8000/pokemons/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          species: pokemon.species,
          name: pokemon.name,
          genderTypeCode: pokemon.genderTypeCode,
          level: Number(pokemon.level),
          size: Number(pokemon.size),
          weight: Number(pokemon.weight),
          isShiny: pokemon.isShiny,
        }),
      });
      console.log(await response.json());
      if (response.ok) {
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

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center bg-[#FFF9ED] rounded-lg shadow-lg p-6 w-96 opacity-90">
        <h2 className="text-2xl font-bold">{pokemon.name}'s Details</h2>
        <div className="mt-4">
          <div className="flex justify-center items-center pt-1">
            <label className="block mr-4 pr-4 w-12 text-right">
              <b>Espèce:</b>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              value={pokemon.species}
              onChange={(e) =>
                setPokemon({ ...pokemon, species: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center items-center pt-1">
            <label className="block mr-4 pr-4 w-12 text-right">
              <b>Nom:</b>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              value={pokemon.name}
              onChange={(e) => setPokemon({ ...pokemon, name: e.target.value })}
            />
          </div>
          <div className="flex justify-center items-center pt-1">
            <label className="block mr-4 pr-4 w-12 text-right">
              <b>Niveau:</b>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              value={pokemon.level}
              onChange={(e) =>
                setPokemon({ ...pokemon, level: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center items-center pt-1">
            <label className="block mr-4 pr-4 w-12 text-right">
              <b>Genre</b>
            </label>
            <select
              value={pokemon.genderTypeCode}
              onChange={(e) =>
                setPokemon({ ...pokemon, genderTypeCode: e.target.value })
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
              <b>Taille:</b>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              value={pokemon.size}
              onChange={(e) => setPokemon({ ...pokemon, size: e.target.value })}
            />
          </div>
          <div className="flex justify-center items-center pt-1">
            <label className="block mr-4 pr-4 w-12 text-right">
              <b>Poids:</b>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              value={pokemon.weight}
              onChange={(e) =>
                setPokemon({ ...pokemon, weight: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center items-center pt-1">
            <label className="block mr-4 pr-4 w-12 text-right">
              <b>Shiny:</b>
            </label>
            <input
              type="checkbox"
              className="border border-gray-300 rounded-md p-2"
              value={pokemon.isShiny ? "Yes" : "No"}
              onChange={(e) =>
                setPokemon({ ...pokemon, isShiny: e.target.checked })
              }
            />
          </div>
        </div>
        {pokemon.trainerId == sessionStorage.getItem("trainerId") && (
          <div className="mt-4">
            <button
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-gray-600"
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
