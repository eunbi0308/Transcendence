import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/login/index";
import Register from "./pages/Register";
// import './App.css';

export function App2() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App2;