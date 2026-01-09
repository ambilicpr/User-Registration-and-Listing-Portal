import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    const isUserExists = users.some((user) => user.mobile === formData.mobile);

    if (isUserExists) {
      setError("User already registered. Please use Login.");
      return;
    }
    const newUser = {
      name: formData.name.trim(),
      email: formData.email,
      mobile: formData.mobile,
    };
    setError("");
    setUsers([...users, newUser]);
    setSuccess("User added successfully!");

    setFormData({
      name: "",
      email: "",
      mobile: "",
    });
  };
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Add User
        </h1>

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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email ID"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
              value={formData.mobile}
              maxLength={10}
              inputMode="numeric"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mobile: e.target.value.replace(/\D/g, ""), // 🔹 block letters & symbols
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add User
          </button>
          {success && (
            <p className="text-green-600 text-sm text-center mt-2">{success}</p>
          )}

          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
          <div className="flex justify-end  mb-6">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="text-blue-600 font-medium hover:underline flex items-center gap-1"
            >
              User List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
