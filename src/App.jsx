import React from "react";
import UserList from "./pages/user-registration-listing/components/UserList";
import UserForm from "./pages/user-registration-listing/components/UserForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
