// useAuthCheck.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  return "unauthorized";
};

export default useAuthCheck;
