import React from "react";

import useAuthCheck from "../hooks/AuthCheck";

interface BoxDetailProps {
  // Define the props for the BoxDetail component here
}

const Trades: React.FC<BoxDetailProps> = () => {
  useAuthCheck();

  return (
    <div className="flex flex-col justify-center items-center h-screen opacity-95">
      <div className="flex justify-center item-center bg-[#FFF9ED] rounded text-3xl font-bold mb-8 w-96 h-96">
        <p className="">Trades</p>
      </div>
    </div>
  );
};

export default Trades;
