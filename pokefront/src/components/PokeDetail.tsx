import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PokeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<any>({});

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

  const handleEditPokemon = () => {
    navigate(`/edit-pokemon/${id}`);
  };

  const handleDeletePokemon = async () => {
    try {
      const response = await fetch(`http://localhost:8000/pokemons/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        navigate(`/box-detail/${pokemon.boxId}`);
      } else {
        console.error("Error deleting Pokemon:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting Pokemon:", error);
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
          <p>
            <b>Espèce:</b> {pokemon.species}
          </p>
          <p>
            <b> Nom: </b>
            {pokemon.name}
          </p>
          <p>
            <b>Niveau: </b>
            {pokemon.level}
          </p>
          <p>
            <b>Genre: </b>
            {pokemon.genderTypeCode}
          </p>
          <p>
            <b>Taille: </b>
            {pokemon.size}
          </p>
          <p>
            <b>Poids: </b>
            {pokemon.weight}
          </p>
          <p>
            <b>chromatique: </b>
            {pokemon.isShiny ? "Yes" : "No"}
          </p>
          <p>
            <b>Login du dresseur: </b>
            {pokemon.trainerId}
          </p>
        </div>
        {pokemon.trainerId == sessionStorage.getItem("trainerId") && (
          <div className="mt-4 flex justify-center items-center">
            <button
              className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={handleEditPokemon}
            >
              Modifier
            </button>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={handleDeletePokemon}
            >
              Supprimer
            </button>
          </div>
        )}
        <button
          className="mt-4 px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
          onClick={handleReturn}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default PokeDetail;
