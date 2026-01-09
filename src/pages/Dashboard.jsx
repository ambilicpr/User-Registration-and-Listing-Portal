// import React from "react";
// const Dashboard = () => {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  //   useEffect(() => {
  //     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  //     setUsers(storedUsers);
  //   }, []);
  const navigate = useNavigate();

  const [users] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  //     return JSON.parse(localStorage.getItem("users")) || [];
  //   });
  const goToRegistration = () => {
    navigate("/register");
  };
  const goToLogin = () => {
    navigate("/login");
  };
  //   setUsers([...users, formData]);

  return (
    // <div className="min-h-screen bg-gray-100 p-8">
    //   {/* Header */}
    //   <div className="flex items-center justify-between mb-6">
    //     <h1 className="text-2xl font-bold text-gray-800 text-center">
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mx-auto">Dashboard</h1>
        <button
          onClick={goToLogin}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Login
        </button>

        <button
          onClick={goToRegistration}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          New Registration
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow p-6">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No registered users yet.</p>
        ) : (
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr className="text-center">
                <th className="border p-2">Name</th>
                <th className="border p-2">Mobile</th>
                <th className="border p-2">DOB</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Place</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="text-center hover:bg-gray-50">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.mobile}</td>
                  <td className="border p-2">{user.dob}</td>
                  <td className="border p-2">{user.gender}</td>
                  <td className="border p-2">{user.place}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  //   return (
  //     <div className="min-h-screen bg-gray-100 p-8">
  //       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

  //       {users.length === 0 ? (
  //         <p>No registered users yet.</p>
  //       ) : (
  //         <table className="w-full border border-gray-300 text-sm">
  //           <thead className="bg-gray-100">
  //             <tr className="text-center">
  //               <th className="border p-2">Name</th>
  //               <th className="border p-2">Mobile</th>
  //               <th className="border p-2">DOB</th>
  //               <th className="border p-2">Gender</th>
  //               <th className="border p-2">Place</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {users.map((user, index) => (
  //               <tr key={index} className="text-center">
  //                 <td className="border p-2">{user.name}</td>
  //                 <td className="border p-2">{user.mobile}</td>
  //                 <td className="border p-2">{user.dob}</td>
  //                 <td className="border p-2">{user.gender}</td>
  //                 <td className="border p-2">{user.place}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       )}
  //       <p className="text-sm text-gray-500 mt-6">
  //         <span
  //           onClick={goToRegistration}
  //           //   className="text-blue-600 font-medium cursor-pointer hover:underline"
  //           className="absolute top-0 right-0 text-sm text-blue-600 font-medium cursor-pointer hover:underline"
  //         >
  //           New Registration
  //         </span>
  //       </p>
  //     </div>
  //   );
};

export default Dashboard;
