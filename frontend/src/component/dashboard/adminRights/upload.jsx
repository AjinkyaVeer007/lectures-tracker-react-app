import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };
  const [state, setState] = useState({
    courseName: "",
    courseType: "",
    courseDescription: "",
    img: "",
  });

  const [status, setStatus] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((previousValue) => ({ ...previousValue, [name]: value }));
    console.log(state);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleSubmit = async () => {
    try {
      const data = {
        courseName: state.courseName,
        courseType: state.courseType,
        courseDescription: state.courseDescription,
        img: state.img,
      };

      await axios.post("http://localhost:4000/uploadCourse", data, config).then(
        setState({
          courseName: "",
          courseType: "",
          courseDescription: "",
          img: "",
        }),
        console.log("Uploaded"),

        setStatus("upload Succesfully"),
        setTimeout(() => {
          setStatus("");
        }, 3000)
      );
      let imgInputField = document.getElementById("courseimg");
      imgInputField.value = "";
    } catch (error) {
      console.log("Fail to upload course");
      console.log(error);
      navigate("/");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setState({ ...state, img: base64 });
  };

  return (
    <div className=" flex justify-center items-start mt-4 text-bold font-[Poppins]">
      <div className="p-8 bg-[#ffe45e] flex flex-col justify-center items-center rounded-lg gap-4">
        <div className="flex justify-center items-center gap-2 w-full space-y-1">
          <div className="block text-sm lg:text-lg">Course Name :-</div>
          <input
            value={state.courseName}
            onChange={handleChange}
            type="text"
            name="courseName"
            placeholder="Enter Course..."
            className="flex-1 border-0 p-2 focus:outline-none focus:ring-2 focus:ring-[#ff6392] sm:text-sm lg:text-lg rounded-md"
          />
        </div>
        <div className="flex justify-center items-center gap-2 w-full space-y-1">
          <div className="block text-sm lg:text-lg">Type :-</div>
          <input
            value={state.courseType}
            onChange={handleChange}
            type="text"
            name="courseType"
            placeholder="Enter Type of Course..."
            className="flex-1 border-0 p-2 focus:outline-none focus:ring-2 focus:ring-[#ff6392] sm:text-sm lg:text-lg rounded-md"
          />
        </div>
        <div className="flex justify-center items-center gap-2 w-full space-y-1">
          <div className="block text-sm lg:text-lg">Description :-</div>
          <textarea
            value={state.courseDescription}
            onChange={handleChange}
            type="text"
            name="courseDescription"
            placeholder="Enter Description..."
            className="flex-1 border-0 p-2 focus:outline-none focus:ring-2 focus:ring-[#ff6392] sm:text-sm lg:text-lg rounded-md"
          />
        </div>
        <div className="flex justify-center items-center gap-2 w-full space-y-1">
          <div className="block text-sm lg:text-lg">Upload Image :-</div>
          <input
            id="courseimg"
            type="file"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-110 mt-4"
          >
            Submit
          </button>
        </div>
        <div>{status}</div>
      </div>
    </div>
  );
}

export default Upload;
