// BoxListPage.tsx
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAuthCheck from "../hooks/AuthCheck";

const BoxListPage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [boxes, setBoxes] = useState<Array<{ id: number; name: string }>>([]);

  useAuthCheck();

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const trainerId = sessionStorage.getItem("trainerId");
        const response = await fetch(
          `http://localhost:8000/trainers/${trainerId}/boxes`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            // Unauthorized, redirect to login
            logout();
            return <Navigate to="/login" />;
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }

        const data = await response.json();
        setBoxes(data);
      } catch (error) {
        console.error("Error fetching boxes:", error);
      }
    };

    fetchBoxes();
  }, [isAuthenticated, logout]);

  return (
    <div className="flex justify-center items-center h-screen opacity-95">
      <div className="flex flex-col justify-center items-center bg-[#FFF9ED] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Liste des Boîtes</h2>
        <ul className="grid grid-cols-3 gap-4">
          {boxes.map((box) => (
            <Link to={`/box/${box.id}`} key={box.id}>
              <li>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  {box.name}
                </div>
              </li>
            </Link>
          ))}
        </ul>

        <Link to="/create-box">
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Ajout d'une boîte
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BoxListPage;
