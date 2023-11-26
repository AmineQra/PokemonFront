// Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-gray-200 p-4 shadow">
      {isLoggedIn ? (
        <>
          <button className="mr-2 px-4 py-2 bg-white text-blue-500 rounded">
            Mes boîtes
          </button>
          <button className="mr-2 px-4 py-2 bg-white text-blue-500 rounded">
            Mes échanges
          </button>
          <button className="mr-2 px-4 py-2 bg-white text-blue-500 rounded">
            Chercher un/une Dresseur/Dresseuse
          </button>
          <button className="mr-2 px-4 py-2 bg-white text-blue-500 rounded">
            Chercher un Pokémon
          </button>
          <button className="mr-2 px-4 py-2 bg-white text-blue-500 rounded">
            Profil utilisateur
          </button>
          <button className="px-4 py-2 bg-white text-blue-500 rounded">
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-between ">
            <div>
              <Link to="/">
                <h1 className="text-black text-3xl px-6">PokéApp</h1>
              </Link>
            </div>

            <div className="flex flex-end px-6">
              <Link to="/connexion">
                <button className="shadow mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                  Se connecter
                </button>
              </Link>
              <Link to="/inscription">
                <button className="shadow px-4 py-2 bg-gray-500 text-white rounded">
                  S'inscrire
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
