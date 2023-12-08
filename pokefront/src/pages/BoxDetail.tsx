import React, { useEffect, useState } from "react";
import { CgPokemon } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthCheck from "../hooks/AuthCheck";

interface BoxDetailProps {
  // Define the props for the BoxDetail component here
}

const BoxDetail: React.FC<BoxDetailProps> = () => {
  useAuthCheck();
  const [selectedPokemonId, setSelectedPokemonId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const trainerId = sessionStorage.getItem("trainerId");

  const [boxData, setBoxData] = useState<any>({
    id: "",
    name: "",
    pokemons: [],
  });

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
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
  }, [id]);

  const handleReturn = () => {
    navigate(-1);
  };

  const handlePokemonDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/trainers/${trainerId}/boxes/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        navigate("/boxes");
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

  const handlePokemonSelect = (event: any) => {
    setSelectedPokemonId(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen opacity-95">
      <div className="flex flex-col justify-center items-center bg-[#FFF9ED] rounded-lg shadow-lg m-6 p-6 w-auto">
        <h2 className="text-2xl font-bold mb-4">{boxData.name}</h2>
        <ul className="grid grid-cols-4 gap-4">
          {boxData.pokemons.map((pokemon: any) => (
            <Link to={`/poke/${pokemon.id}`}>
              <li key={pokemon.id}>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <CgPokemon />
                  {pokemon.species} - {pokemon.level} - {pokemon.genderTypeCode}{" "}
                  - {pokemon.isShiny ? <b>Shiny</b> : <b>Not Shiny</b>}
                </div>
              </li>
            </Link>
          ))}
        </ul>
        <div className="flex flex justify-center items-center mt-4">
          <Link to={`/add-poke`}>
            <button className="mx-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-gray-600">
              Ajouter un Pokemon
            </button>
          </Link>
          <Link to={`/edit-box/${id}`}>
            <button className="mx-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-gray-600">
              Modifier la Box
            </button>
          </Link>
          <select
            value={selectedPokemonId}
            onChange={handlePokemonSelect}
            className="px-4 py-2 text-black rounded border border-black"
          >
            <option disabled value="">
              choisi le pokemon a déplacer
            </option>
            {boxData.pokemons.map((pokemon: any) => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name}
              </option>
            ))}
          </select>
          <Link to={`/move-poke/${selectedPokemonId}`}>
            <button className="mx-4 px-4 py-2 text-white bg-orange-500 rounded hover:bg-gray-600">
              Déplacer un Pokemon
            </button>
          </Link>
          <button
            onClick={handlePokemonDelete}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-gray-600"
          >
            Supprimer la Box
          </button>
        </div>
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

export default BoxDetail;
