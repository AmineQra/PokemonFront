import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = () => {
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
    <header className="fixed w-full bg-white p-4 shadow opacity-75 z-40">
      {sessionStorage.getItem("accessToken") ? (
        <>
          <div className="flex justify-between ">
            <div>
              <Link to="/">
                <h1 className="text-3xl px-6">
                  <span style={{ color: "red" }}>
                    <b>P</b>
                  </span>
                  <span style={{ color: "orange" }}>
                    <b>o</b>
                  </span>
                  <span style={{ color: "Cyan" }}>
                    <b>k</b>
                  </span>
                  <span style={{ color: "green" }}>
                    <b>é</b>
                  </span>
                  <span style={{ color: "blue" }}>
                    <b>A</b>
                  </span>
                  <span style={{ color: "indigo" }}>
                    <b>p</b>
                  </span>
                  <span style={{ color: "violet" }}>
                    <b>p</b>
                  </span>
                </h1>
              </Link>
            </div>
            <div>
              <Link to="/boxes">
                <button className="shadow mr-2 px-4 py-2 bg-blue-500 text-white rounded">
                  Mes boîtes
                </button>
              </Link>
              <Link to="/exchanges">
                <button className="shadow mr-2 px-4 py-2 bg-green-500 text-white rounded">
                  Mes échanges
                </button>
              </Link>
              <Link to="/trainer">
                <button className="shadow mr-2 px-4 py-2 bg-purple-500 text-white rounded">
                  Dresseur/Dresseuse
                </button>
              </Link>
              <Link to="/pokemons">
                <button className="shadow mr-2 px-4 py-2 bg-yellow-500 text-white rounded">
                  Pokémon
                </button>
              </Link>
              <Link to="/profile">
                <button className="shadow mr-2 px-4 py-2 bg-orange-500 text-white rounded">
                  Profil utilisateur
                </button>
              </Link>
              <button
                onClick={HandleLogOut}
                className="shadow mr-2 px-4 py-2 bg-red-600 text-white rounded"
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
                <h1 className="text-3xl px-6">
                  <span style={{ color: "red" }}>
                    <b>P</b>
                  </span>
                  <span style={{ color: "orange" }}>
                    <b>o</b>
                  </span>
                  <span style={{ color: "Cyan" }}>
                    <b>k</b>
                  </span>
                  <span style={{ color: "green" }}>
                    <b>é</b>
                  </span>
                  <span style={{ color: "blue" }}>
                    <b>A</b>
                  </span>
                  <span style={{ color: "indigo" }}>
                    <b>p</b>
                  </span>
                  <span style={{ color: "violet" }}>
                    <b>p</b>
                  </span>
                </h1>
              </Link>
            </div>

            <div className="flex flex-end px-6">
              <Link to="/login">
                <Link to="/login">
                  <button className="shadow mr-2 px-4 py-2 bg-blue-500 text-white rounded">
                    <b>Se connecter</b>
                  </button>
                </Link>
                <Link to="/register">
                  <button className="shadow px-4 py-2 bg-green-500 text-white rounded">
                    <b>S'inscrire</b>
                  </button>
                </Link>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
