import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("token", "email");
    navigate("/");
  };
  return (
    <button
      onClick={handleLogout}
      class="bg-[#ff6392] text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:translate-x-2 hover:shadow-lg"
    >
      Logout
    </button>
  );
}

export default Logout;
