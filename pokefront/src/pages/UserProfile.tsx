import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthCheck from "../hooks/AuthCheck";

interface BoxDetailProps {
  // Define the props for the BoxDetail component here
}

const UserProfile: React.FC<BoxDetailProps> = () => {
  const navigate = useNavigate();
  const trainerId = sessionStorage.getItem("trainerId");
  const [profile, setProfile] = useState<any>({
    id: "",
    firstName: "",
    lastName: "",
    login: "",
    birthDate: "",
  });

  useAuthCheck();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/trainers/${trainerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
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
  }, [trainerId]);

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center bg-[#FFF9ED] rounded-lg shadow-lg p-6 w-96 opacity-90">
        <h2 className="text-2xl font-bold">{profile.firstName}'s Details</h2>
        <div className="mt-4">
          {["firstName", "lastName", "login", "birthDate"].map((field) => (
            <div key={field} className="flex justify-center items-center pt-1">
              <label className="block m-4 mr-4 pr-4 w-24 text-right">
                <b>
                  {field === "firstName"
                    ? "prénom"
                    : field === "lastName"
                    ? "nom"
                    : field === "birthDate"
                    ? "date de naissance"
                    : field}
                  :
                </b>
              </label>
              <p className="block m-4 ml-0 pl-0 w-24 text-left">
                {profile[field]}
              </p>
            </div>
          ))}
        </div>
        <Link to={"/update-user"}>
          <button className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            Modifier profile
          </button>
        </Link>
        <button
          className="mt-4 px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
          onClick={handleReturn}
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
