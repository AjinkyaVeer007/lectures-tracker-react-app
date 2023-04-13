import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Assign({ courses, instructor }) {
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };

  const [state, setState] = useState({
    courseName: "",
    date: "",
    assignTo: "",
  });

  const [status, setStatus] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((previousValue) => ({ ...previousValue, [name]: value }));
  };

  const scheduleLecture = async () => {
    const data = {
      courseName: state.courseName,
      date: state.date,
      assignTo: state.assignTo,
    };

    await axios
      .post("http://localhost:4000/admin/schedulelecture", data, config)
      .then(
        setState({
          courseName: "",
          date: "",
          assignTo: "",
        }),
        setStatus("Lecture Scheduled Successfully")
      )
      .catch((err) => {
        setStatus(err.response.data.message);
        if (err.response.data.message == "Invalid Token") {
          navigate("/");
        }
      });
  };

  return (
    <div className="flex justify-center items-center mt-4 rounded-lg gap-4">
      <div className="bg-[#ffe45e] p-8 flex flex-col  justify-start items-center rounded-md text-bold font-[Poppins] md:text-sm lg:text-lg">
        <div className="flex justify-center items-center gap-2 w-full space-y-1">
          <div>Course Name :-</div>
          <select
            id="courseName"
            name="courseName"
            className="p-2 rounded"
            value={state.courseName}
            onChange={handleChange}
          >
            <option value=""></option>
            {courses &&
              courses.map((item, index) => (
                <option key={index} value={item.courseName}>
                  {item.courseName}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-center items-center gap-2 w-full space-y-1">
          <div>Date :-</div>
          <input
            type="date"
            id="date"
            name="date"
            value={state.date}
            onChange={handleChange}
            placeholder="Enter Type of Course..."
            className="flex-1 border-0 p-2 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm lg:text-lg rounded-md"
          />
        </div>
        <div className="flex justify-start items-center gap-2 w-full space-y-1">
          <div>Assign to :-</div>
          <select
            id="username"
            className="p-2 rounded"
            value={state.assignTo}
            name="assignTo"
            onChange={handleChange}
          >
            <option value=""></option>
            {instructor &&
              instructor.map((item, index) => (
                <option key={index} value={item.username}>
                  {item.username}
                </option>
              ))}
          </select>
        </div>
        <div>
          <button
            onClick={scheduleLecture}
            className="bg-[#ff6392] text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-110 mt-4"
          >
            Schedule Lecture
          </button>
        </div>
        <div>{status}</div>
      </div>
    </div>
  );
}

export default Assign;
