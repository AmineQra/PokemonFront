import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center fixed bottom-0 left-0 w-full bg-white p-4 opacity-75">
      <div>
        <b>À propos de PokéApp™ </b>
      </div>
      {"\u00A0"}
      <Link className="underline" to="/about">
        <b>ici</b>
      </Link>
    </footer>
  );
};

export default Footer;
