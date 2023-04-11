import React, { useState } from "react";
import LoginPage from "./login";
import RegisterPage from "./register";

function SignInPage() {
  const [state, setState] = useState("register");

  const handlelogin = () => {
    setState("login");
  };
  const handleRegister = () => {
    setState("register");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4 text-white text-3xl">
        Welcome to Lectures Tracker App
      </div>
      {state === "register" ? <RegisterPage /> : <LoginPage />}
      <div className="flex justify-center items-center gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-110"
          onClick={handleRegister}
        >
          Register
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-110"
          onClick={handlelogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
