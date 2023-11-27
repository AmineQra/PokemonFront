import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface BoxPageProps {
  boxes: string[];
  isUserBoxes: boolean;
}

const BoxPage: React.FC<BoxPageProps> = ({ boxes, isUserBoxes }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Liste des boîtes</h2>
      <ul>
        {boxes.map((box, index) => (
          <li key={index}>
            <Link to={`/boites/${index}`}>{box}</Link>
          </li>
        ))}
      </ul>
      {isUserBoxes && (
        <Link to="/creation-boite">
          <button>Ajout d&lsquo;une boîte</button>
        </Link>
      )}
    </div>
  );
};

export default BoxPage;
