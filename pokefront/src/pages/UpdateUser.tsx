import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../hooks/AuthCheck";

interface UserPageProps {}

const UpdateUser: React.FC<UserPageProps> = () => {
  const navigate = useNavigate();
  const trainerId = sessionStorage.getItem("trainerId");
  const [pass, setpass] = useState("");
  const [pass2, setpass2] = useState("");
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
          // Set the profile state after fetching the data
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

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/trainers/${trainerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(profile),
        }
      );

      if (response.ok) {
        navigate("/profile");
      } else {
        console.error("Error updating Pokemon:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Pokemon:", error);
    }
  };

  const handlepassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpass(e.target.value);
  };

  const handlepassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpass2(e.target.value);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfile((prevProfile: any) => ({ ...prevProfile, [field]: value }));
  };

  const handlebtn = () => {
    if (pass === pass2) {
      return true;
    } else {
      return false;
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center bg-[#FFF9ED] rounded-lg shadow-lg p-6 w-auto opacity-90">
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
                </b>
              </label>
              <input
                type={field === "birthDate" ? "date" : "text"}
                className={
                  field === "birthDate"
                    ? "border border-gray-300 rounded-md p-2 w-[12.5rem]"
                    : "border border-gray-300 rounded-md p-2"
                }
                value={profile[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            </div>
          ))}
          <div className="flex justify-center items-center pt-1">
            <label className="block m-4 mr-4 pr-4 w-24 text-right">
              <b>mot de passe </b>
            </label>
            <input
              className="border border-gray-300 rounded-md p-2"
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => handlepassword(e)}
            />
          </div>
          <div className="flex justify-center items-center pt-1">
            <label className="block m-4 mr-4 pr-4 w-24 text-right">
              <b>confirmer </b>
            </label>
            <input
              className="border border-gray-300 rounded-md p-2"
              type="password"
              placeholder="confirmer Mot de passe"
              onChange={(e) => handlepassword2(e)}
            />
          </div>
        </div>

        <div className="mt-4">
          {handlebtn() ? (
            <button
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              onClick={handleUpdateProfile}
            >
              Sauvegarder
            </button>
          ) : (
            <button
              className="px-4 py-2 text-white bg-gray-500 rounded"
              onClick={handleUpdateProfile}
              disabled
            >
              Sauvegarder
            </button>
          )}
        </div>
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

export default UpdateUser;
