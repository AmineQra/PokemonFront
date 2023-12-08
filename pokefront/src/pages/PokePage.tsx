import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgPokemon } from "react-icons/cg";
import useAuthCheck from "../hooks/AuthCheck";

const PokePage: React.FC = () => {
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [gender, setGender] = useState("");
  const [minLevelFilter, setMinLevelFilter] = useState(1);
  const [maxLevelFilter, setMaxLevelFilter] = useState(100);
  const [minSizeFilter, setMinSizeFilter] = useState(1);
  const [maxSizeFilter, setMaxSizeFilter] = useState(100);
  const [minWeightFilter, setMinWeightFilter] = useState(0.1);
  const [maxWeightFilter, setMaxWeightFilter] = useState(100);
  const [isShinyFilter, setIsShinyFilter] = useState(Boolean);
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemons, setPokemons] = useState<Array<any>>([]);

  useAuthCheck();

  const handleSpeciesFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpeciesFilter(event.target.value);
  };

  const handleMinLevelFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (Number(event.target.value) < 1 || Number(event.target.value) > 100) {
      setMinLevelFilter(1);
    }
    setMinLevelFilter(Number(event.target.value));
  };

  const handleMaxLevelFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (Number(event.target.value) < 1 || Number(event.target.value) > 100) {
      setMaxLevelFilter(100);
    }
    setMaxLevelFilter(Number(event.target.value));
  };

  const handleMinSizeFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (Number(event.target.value) < 1) {
      setMinSizeFilter(1);
    }
    setMinSizeFilter(Number(event.target.value));
  };

  const handleMaxSizeFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxSizeFilter(Number(event.target.value));
  };

  const handleMinWeightFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (Number(event.target.value) < 0.1) {
      setMinWeightFilter(0.1);
    }
    setMinWeightFilter(Number(event.target.value));
  };

  const handleMaxWeightFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxWeightFilter(Number(event.target.value));
  };

  const handleIsShinyFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsShinyFilter(event.target.checked);
  };

  const handleNextPage = () => {
    if (currentPage >= 20) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage <= 0) {
      return;
    }
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        let queryString = `?page=${currentPage}&pageSize=20`;

        if (speciesFilter !== "") {
          queryString += `&species=${encodeURIComponent(speciesFilter)}`;
        }

        if (gender !== "") {
          queryString += `&gender=${gender}`;
        }

        if (minLevelFilter >= 1 && minLevelFilter <= 100) {
          queryString += `&levelMin=${minLevelFilter}`;
        }

        if (maxLevelFilter >= 1 && maxLevelFilter <= 100) {
          queryString += `&levelMax=${maxLevelFilter}`;
        }

        if (minSizeFilter >= 1) {
          queryString += `&sizeMin=${minSizeFilter}`;
        }

        if (maxSizeFilter) {
          queryString += `&sizeMax=${maxSizeFilter}`;
        }

        if (minWeightFilter >= 0.1) {
          queryString += `&weightMin=${minWeightFilter}`;
        }

        if (maxWeightFilter) {
          queryString += `&weightMax=${maxWeightFilter}`;
        }

        if (isShinyFilter) {
          queryString += `&isShiny=${isShinyFilter}`;
        }
        console.log(queryString);
        const response = await fetch(
          `http://localhost:8000/pokemons?${queryString}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );

        const data = await response.json();
        setPokemons(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemons();
  }, [
    currentPage,
    speciesFilter,
    gender,
    minLevelFilter,
    maxLevelFilter,
    minSizeFilter,
    maxSizeFilter,
    minWeightFilter,
    maxWeightFilter,
    isShinyFilter,
  ]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="fixed top-20 right-0 p-4">
        <Link to="/add-poke">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log("Add Pokemon")}
          >
            Add Pokemon
          </button>
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4">Liste des Pokémons</h2>

      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center justify-center bg-[#FFF9ED] p-4 rounded opacity-95">
          <p className="text-xl font-bold mb-4">Filtres</p>

          <div className="flex justify-center items-center w-96">
            <label className="block mb-2 pr-4 w-24 text-right">Espèce </label>
            <input
              type="text"
              value={speciesFilter}
              onChange={handleSpeciesFilterChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="pt-1 flex justify-center items-center w-96 m-2">
            <label className="block mb-2 pr-4 w-24 text-right">Genre</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-[12.5rem]"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="NOT_DEFINED">Not Defined</option>
            </select>
          </div>

          <div className="flex justify-center items-center">
            <label className="block mb-2 pr-4 w-24 text-right">
              Niveau Min
            </label>
            <input
              type="number"
              value={minLevelFilter}
              onChange={handleMinLevelFilterChange}
              className="border border-gray-300 rounded-md p-2 "
            />
          </div>

          <div className="pt-2 flex justify-center items-center">
            <label className="block mb-2 pr-4 w-24 text-right">
              Niveau Max
            </label>
            <input
              type="number"
              value={maxLevelFilter}
              onChange={handleMaxLevelFilterChange}
              className="border border-gray-300 rounded-md p-2 "
            />
          </div>

          <div className="pt-2 flex justify-center items-center">
            <label className="block mb-2 pr-4 w-24 text-right">
              Taille Min
            </label>
            <input
              type="number"
              value={minSizeFilter}
              onChange={handleMinSizeFilterChange}
              className="border border-gray-300 rounded-md p-2 "
            />
          </div>
          <div className="pt-2 flex justify-center items-center">
            <label className="block mb-2 pr-4 w-24 text-right">
              Taille Max
            </label>
            <input
              type="number"
              value={maxSizeFilter}
              onChange={handleMaxSizeFilterChange}
              className="border border-gray-300 rounded-md p-2 "
            />
          </div>
          <div className="pt-2 flex justify-center items-center">
            <label className="block mb-2 pr-4 w-24 text-right">Poids Min</label>
            <input
              type="number"
              value={minWeightFilter}
              onChange={handleMinWeightFilterChange}
              className="border border-gray-300 rounded-md p-2 "
            />
          </div>
          <div className="pt-2 flex justify-center items-center">
            <label className="block mb-2 pr-4 w-24 text-right">Poids Max</label>
            <input
              type="number"
              value={maxWeightFilter}
              onChange={handleMaxWeightFilterChange}
              className="border border-gray-300 rounded-md p-2 "
            />
          </div>

          <div className="pt-2 flex justify-center items-center">
            <label className="block mb-2 pr-4 w-24 text-right">Shiny </label>
            <input
              type="checkbox"
              checked={isShinyFilter}
              onChange={handleIsShinyFilterChange}
              className=""
            />
          </div>
        </div>

        <div className="ml-2 bg-[#FFF9ED] rounded shadow p-4 flex flex-col justify-between opacity-95 min-h-[33.7rem] w-">
          <div className="flex justify-center items-center">
            <p className="text-xl font-bold mb-4">Pokemons</p>
          </div>

          <div className="grid grid-cols-4 gap-4 flex justify-center items-center">
            {pokemons.map((pokemon) => (
              <Link to={`/poke/${pokemon.id}`} key={pokemon.id}>
                <div
                  key={pokemon.id}
                  onClick={() => console.log(pokemon)}
                  className="bg-gray-200 p-2 rounded cursor-pointer flex justify-center items-center rounded-full"
                >
                  <CgPokemon />
                  <p>
                    {pokemon.name} - Level {pokemon.level}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="h-12 bg-[#FFF9ED]"></div>
          <div className=" flex justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePreviousPage}
            >
              Précédente
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextPage}
            >
              Suivante
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokePage;
