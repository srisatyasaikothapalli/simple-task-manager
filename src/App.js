// App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import ProjectList from "./components/ProjectList";
import Profile from "./components/Profile";
import ProjectHistory from "./components/ProjectHistory";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  if (!user) {
    return (
      <div className="container">
        <h1>📝 Project Task Manager</h1>
        <Login onLogin={setUser} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>📝 Project Task Manager</h1>
      <div className="nav-bar">
        <Link to="/">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/history">Project History</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Routes>
        <Route path="/" element={<ProjectList userId={user.uid} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/history" element={<ProjectHistory userId={user.uid} />} />
      </Routes>
    </div>
  );
}

export default App;