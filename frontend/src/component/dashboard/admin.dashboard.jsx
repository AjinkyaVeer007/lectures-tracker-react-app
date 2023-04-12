import React, { useEffect, useState } from "react";
import Logout from "./logout";
import Upload from "./adminRights/upload";
import Assign from "./adminRights/assign";
import Status from "./adminRights/status";
import CoursesList from "./adminRights/courselist";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };

  const [courses, setCourses] = useState();
  const [instructor, setInstructor] = useState();
  const [lectures, setLectures] = useState();

  const getAllCourses = async () => {
    await axios
      .get("http://localhost:4000/admin/getcourse", config)
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((error) => {
        console.log("fail to get courses");
        console.log(error);
        navigate("/");
      });
  };

  const getAllInstructors = async () => {
    await axios
      .get("http://localhost:4000/admin/getinstructor", config)
      .then((res) => {
        let users = res.data.data;
        let filteredUsers = users.filter((person) => {
          return person.username != "admin";
        });

        setInstructor(filteredUsers);

        // setInstructor(res.data.data);
      })
      .catch((error) => {
        console.log("fail to get courses");
        console.log(error);
        navigate("/");
      });
  };

  const getAllLectures = async () => {
    await axios
      .get("http://localhost:4000/admin/getAllLectures", config)
      .then((res) => {
        setLectures(res.data.data);
      })
      .catch((error) => {
        console.log("Fail to load Lectures");
        console.log(error);
        navigate("/");
      });
  };

  const [page, setPage] = useState(<CoursesList />);

  const handleCourses = () => {
    getAllCourses();
    setPage(<CoursesList courses={courses} />);
  };

  const handleUpload = () => {
    setPage(<Upload />);
  };
  const handleAssign = () => {
    setPage(<Assign courses={courses} instructor={instructor} />);
  };
  const handleStatus = () => {
    getAllLectures();
    setPage(<Status lectures={lectures} />);
  };

  useEffect(() => {
    getAllCourses();
    getAllInstructors();
    getAllLectures();
  }, [0]);

  return (
    <div className="bg-[#f9f9f9] h-max pb-4">
      <div className="flex justify-between items-center px-8 py-2 bg-[#B2A4FF] text-white">
        <div className="font-bold text-2xl">Welcome Admin</div>
        <Logout />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
        <button
          onClick={handleCourses}
          className="bg-[#ff6392] text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-110"
        >
          All Courses
        </button>
        <button
          onClick={handleUpload}
          className="bg-[#ff6392] text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-110"
        >
          Upload
        </button>
        <button
          onClick={handleAssign}
          className="bg-[#ff6392] text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-110"
        >
          Assign
        </button>
        <button
          onClick={handleStatus}
          className="bg-[#ff6392] text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-110"
        >
          Status
        </button>
      </div>
      {page}
    </div>
  );
}

export default AdminDashboard;
