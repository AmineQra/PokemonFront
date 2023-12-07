import React from "react";

const AboutPage: React.FC = () => {
  const developerName = "Amine";
  const developerSurname = "Ahdadouch";
  const email = "Ahdadouch.amine@outlook.fr";

  return (
    <div className="flex justify-center items-center h-screen opacity-90">
      <div className="bg-[#FFF9ED] text-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">A propos du développeur</h1>
        <p className="mb-2">Prénom: {developerName}</p>
        <p className="mb-2">Nom: {developerSurname}</p>
        <p className="mb-2">Email: {email} </p>
      </div>
    </div>
  );
};

export default AboutPage;
