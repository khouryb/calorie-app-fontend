import { Routes, Route, Router } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Routeguard from "./components/Routeguard";
import Addingredient from "./components/Addingredient";
import Meals from "./components/Meals.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ingredients" element={<Addingredient />} />
      <Route path="/meals" element={<Meals />} />
      <Route element={<Routeguard />}>
        <Route element={<Dashboard />} path="/dashboard" />
      </Route>
    </Routes>
  );
}

export default App;
