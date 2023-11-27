import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { isAuthenticated } = useAuth();
  const authlogout = useAuth().logout;
  const navigate = useNavigate();
  const HandleLogOut = async () => {
    try {
      await authlogout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="bg-gray-200 p-4 shadow">
      {isAuthenticated ? (
        <>
          <div className="flex justify-between ">
            <div>
              <Link to="/">
                <h1 className="text-black text-3xl px-6">PokéApp</h1>
              </Link>
            </div>
            <div>
              <button className="shadow mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                Mes boîtes
              </button>
              <button className="shadow mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                Mes échanges
              </button>
              <button className="shadow mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                Chercher un/une Dresseur/Dresseuse
              </button>
              <button className="shadow mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                Chercher un Pokémon
              </button>
              <button className="shadow mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                Profil utilisateur
              </button>
              <button
                onClick={HandleLogOut}
                className="shadow mr-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Déconnexion
              </button>
            </div>
          </div>
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
              <Link to="/login">
                <button className="shadow mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                  Se connecter
                </button>
              </Link>
              <Link to="/register">
                <button className="shadow px-4 py-2 bg-gray-500 text-white rounded">
                  S&lsquo;inscrire
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
