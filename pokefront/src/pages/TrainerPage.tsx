import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthCheck from "../hooks/AuthCheck";
import { FaRegUser } from "react-icons/fa";

interface BoxDetailProps {
  // Define the props for the BoxDetail component here
}

const TrainerPage: React.FC<BoxDetailProps> = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [login, setLogin] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrenom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrenom(event.target.value);
  };

  const handleNom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const [trainers, setTrainers] = useState<Array<any>>([]);

  useAuthCheck();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        let queryString = `?page=${currentPage}&pageSize=20`;

        if (prenom !== "") {
          queryString += `&firstName=${prenom}`;
        }

        if (nom !== "") {
          queryString += `&lastName=${nom}`;
        }

        if (login !== "") {
          queryString += `&login=${login}`;
        }
        console.log(queryString);

        const response = await fetch(
          `http://localhost:8000/trainers${queryString}`,
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
          setTrainers(data);
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
  }, [prenom, nom, login, currentPage]);

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

  return (
    <div className="flex flex-col justify-center items-center h-screen  opacity-90">
      <h2 className="text-2xl font-bold">Dresseurs</h2>
      <div className="flex flex-col justify-center items-center p-6 w-auto">
        <div className="flex justify-center items-center">
          <div className="mx-2 flex flex-col items-center bg-[#FFF9ED] p-4 rounded opacity-95 h-96">
            <p className="text-xl font-bold mb-4">Filtres</p>

            <div className="flex justify-center items-center w-96">
              <label className="block mb-2 pr-4 w-24 text-right">Prénom </label>
              <input
                type="text"
                value={prenom}
                onChange={handlePrenom}
                className="mb-2 border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex justify-center items-center">
              <label className="block mb-2 pr-4 w-24 text-right">Nom</label>
              <input
                type="text"
                value={nom}
                onChange={handleNom}
                className="border border-gray-300 rounded-md p-2 "
              />
            </div>

            <div className="pt-2 flex justify-center items-center">
              <label className="block mb-2 pr-4 w-24 text-right">Login</label>
              <input
                type="text"
                value={login}
                onChange={handleLogin}
                className="border border-gray-300 rounded-md p-2 "
              />
            </div>
          </div>
          <div className="bg-[#FFF9ED] p-4 rounded h-96">
            <div className="flex justify-center">
              <h2 className="text-2xl font-bold mb-4">liste des dresseurs</h2>
            </div>

            <div className="mx-2 flex flex-col justify-center items-center">
              <ul className="grid grid-cols-4 gap-4">
                {trainers.map((trainer: any) => (
                  <Link to={`/trainer/${trainer.id}`}>
                    <li key={trainer.id}>
                      <div className="bg-white rounded-lg shadow-lg p-4">
                        <FaRegUser />
                        {trainer.firstName} - {trainer.lastName} -{" "}
                        {trainer.login}
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
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
    </div>
  );
};

export default TrainerPage;
