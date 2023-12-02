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

    if (isAuthenticated) {
      fetchBoxes();
    }
  }, [isAuthenticated, logout]);

  return (
    <div>
      <h2>Liste des Boîtes</h2>
      <ul>
        {boxes.map((box) => (
          <li key={box.id}>
            <Link to={`/box/${box.id}`}>{box.name}</Link>
          </li>
        ))}
      </ul>

      {isAuthenticated && (
        <Link to="/create-box">
          <button>Ajout d&lsquo;une boîte</button>
        </Link>
      )}
    </div>
  );
};

export default BoxListPage;
