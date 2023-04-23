import "./App.css";
import Login from "./pages/Login";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./pages/Profile";
import { useState } from "react";
import { useStateValue } from "./redux/Stateprovider";

function App() {
  const [{ user }] = useStateValue();
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route
          exact
          path="/home"
          element={user? <Profile /> : <Login />}
        ></Route>
        <Route exact path="/contact" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
