import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notify = () => toast("User Register Successfully!");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="flex flex-col items-center justify-center my-12">
      <form className="p-8 bg-white rounded shadow-md" onSubmit={handleSubmit}>
        <h1 className="mb-8 text-2xl font-bold">Register</h1>
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
          onClick={notify}
          className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
        >
          Register
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default RegisterPage;
