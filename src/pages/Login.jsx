import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!mobile || !password) {
    //   setError("Please enter both mobile number and password");
    //   return;
    // }
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔐 Check if user exists
    const matchedUser = users.find(
      (user) => user.mobile === mobile && user.password === password
    );

    if (!matchedUser) {
      setError("Invalid mobile number or password");
      return;
    }

    // ✅ Login success
    // setError("");

    // Optional: save logged-in user
    // localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

    setError("");
    navigate("/dashboard");
  };

  const goToRegistration = () => {
    navigate("/register");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ext-white text-2xl"></div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">School Admission</h1>

        <p className="text-gray-500 mt-2 mb-6">
          Sign in to access your dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile No
            </label>
            <input
              type="text"
              placeholder="Enter your mobile no"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={10}
              pattern="[0-9]{10}"
              inputMode="numeric"
              required
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              value={mobile}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6">
          New user?{" "}
          <span
            onClick={goToRegistration}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            New Registration
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
