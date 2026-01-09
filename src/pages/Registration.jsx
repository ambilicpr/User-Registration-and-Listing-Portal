import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    dob: "",
    gender: "",
    place: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      setError("Passwords do not match");
      return;
    }

    const isUserExists = users.some((user) => user.mobile === formData.mobile);

    if (isUserExists) {
      setError("User already registered. Please use Login.");
      return;
    }
    const newUser = {
      name: formData.name.trim(),
      mobile: formData.mobile,
      dob: formData.dob,
      gender: formData.gender,
      place: formData.place.trim(),
      password: formData.password.trim(),
    };
    setError("");
    setUsers([...users, newUser]);

    setFormData({
      name: "",
      mobile: "",
      dob: "",
      gender: "",
      place: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          New User Registration
        </h1>
        {/* ✅ Error message goes here */}
        {error && (
          <p className="text-red-600 text-sm text-center mt-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text" // 🔹 change from tel → text
              name="mobile"
              placeholder="Enter mobile number"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
              value={formData.mobile}
              maxLength={10} // 🔹 limit length
              inputMode="numeric" // 🔹 numeric keypad
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mobile: e.target.value.replace(/\D/g, ""), // 🔹 block letters & symbols
                })
              }
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
              onChange={handleChange}
              value={formData.dob}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
              onChange={handleChange}
              value={formData.gender}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Place */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="select"
              name="State"
            //   placeholder="Enter your state"
              option
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
              onChange={handleChange}
              value={formData.place}
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              minLength={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
          <div className="flex justify-end  mb-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-blue-600 font-medium hover:underline flex items-center gap-1"
            >
              Back to Dashboard
            </button>
          </div>
        </form>
        {users.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Registered Users</h2>

            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Mobile</th>
                  <th className="border p-2">DOB</th>
                  <th className="border p-2">Gender</th>
                  <th className="border p-2">Place</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.mobile}</td>
                    <td className="border p-2">{user.dob}</td>
                    <td className="border p-2">{user.gender}</td>
                    <td className="border p-2">{user.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
