import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const trainerId = sessionStorage.getItem("trainerId");

    if (!accessToken) {
      navigate("/login");
    } else {
      fetch(`http://localhost:8000/trainers/${trainerId}/boxes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.status == 401) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);

  return "authorized";
};

export default useAuthCheck;
