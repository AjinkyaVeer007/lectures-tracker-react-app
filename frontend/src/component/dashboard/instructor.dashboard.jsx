import React, { useEffect, useState } from "react";
import Logout from "./logout";
import axios from "axios";

function InstructorDashboard() {
  const name = localStorage.getItem("username");
  const [lectures, setLectures] = useState();

  const data = {
    username: localStorage.getItem("username"),
  };

  const getMyLectures = async () => {
    await axios
      .post("http://localhost:4000/instructor/getscheduledlectures", data)
      .then((res) => {
        setLectures(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyLectures();
  }, [0]);
  return (
    <div className="bg-[#f9f9f9] h-screen">
      <div className="flex justify-between items-center px-8 py-2 bg-[#B2A4FF] text-white">
        <div className="font-bold text-2xl">
          Welcome Instructure - {name.toUpperCase()}
        </div>
        <Logout />
      </div>
      <div>
        <div className="flex flex-wrap gap-2 justify-center items-center font-lg font-bold font-[Poppins] mt-8">
          {lectures &&
            lectures.map((item, index) => (
              <div key={index}>
                <div className="bg-[#ffe45e] p-4 rounded flex justify-start items-start border-l-8 border-[#ff6392]">
                  <div className="p-2">
                    <h1 className="mt-2">Name : {item.courseName}</h1>
                    <h1 className="mt-2">Lecture Date : {item.date}</h1>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
