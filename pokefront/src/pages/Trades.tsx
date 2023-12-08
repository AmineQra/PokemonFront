import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthCheck from "../hooks/AuthCheck";

interface BoxDetailProps {
  // Define the props for the BoxDetail component here
}

const Trades: React.FC<BoxDetailProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useAuthCheck();

  return (
    <div className="flex flex-col justify-center items-center h-screen opacity-95"></div>
  );
};

export default Trades;
