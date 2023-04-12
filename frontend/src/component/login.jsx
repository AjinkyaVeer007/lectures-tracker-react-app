import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    console.log(message);
    setMessage("");
    event.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password,
    };

    await axios
      .post("http://localhost:4000/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.data);
        localStorage.setItem("username", res.data.username);

        if (res.data.data === "admin@gmail.com") {
          navigate("/admin/dashboard");
        } else {
          navigate("/instructor/dashboard");
        }
      })
      .catch((err) => {
        setMessage("Incorrect Credentials or Need to Register first");
        console.log("fail to login");
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center m-4 font-[Poppins]">
      <form
        className="p-8 bg-[#ffe45e] rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-8 text-2xl font-bold">Login</h1>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="email">
            UserName
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="email"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button
          className="w-full px-3 py-2 text-white bg-[#ff6392] rounded"
          type="submit"
        >
          Login
        </button>
        <div className="text-red-500 text-[15px]">{message}</div>
      </form>
    </div>
  );
};

export default LoginPage;
