import React from "react";

function CoursesList({ courses }) {
  return (
    <div>
      <div className="p-2 mt-4 flex flex-wrap gap-2 justify-center items-start font-[Poppins]">
        {courses &&
          courses.map((item, index) => (
            <div key={index}>
              <div className="bg-[#ffe45e] h-full w-[300px] rounded flex flex-col justify-start items-start border-b-8 border-[#ff6392]">
                <div className="p-2 ">
                  <img src={item.img} />
                </div>
                <div className="p-2">
                  <h1 className="mt-2">
                    <span className="text-lg font-bold">Name : </span>
                    {item.courseName}
                  </h1>
                  <h1 className="mt-2">
                    <span className="text-lg font-bold">Type : </span>
                    {item.courseType}
                  </h1>
                  <h1 className="mt-2 text-sm">
                    <span className="text-lg font-bold">Description : </span>
                    {item.courseDescription}
                  </h1>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CoursesList;
