import React from "react";

function Status({ lectures }) {
  return (
    <div className="flex justify-center items-center font-[Poppins]">
      <table className="w-[95vw] table-auto mt-8">
        <thead className="bg-red-300">
          <tr>
            <th className="w-1/3 px-4 py-2 border">Instructor Name</th>
            <th className="w-1/3 px-4 py-2 border">Course Name</th>
            <th className="w-1/3 px-4 py-2 border">Date</th>
          </tr>
        </thead>
        {lectures &&
          lectures.map((item, index) => (
            <tbody className="bg-red-200">
              <tr key={index}>
                <td className="px-4 py-2 border">
                  {item.assignTo.toUpperCase()}
                </td>
                <td className="px-4 py-2 border">
                  {item.courseName.toUpperCase()}
                </td>
                <td className="px-4 py-2 border">{item.date}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default Status;
