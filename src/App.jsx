// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Homepage from "./pages/Homepage.jsx";
import Platform from "./pages/Platform.jsx";
import Resources from "./pages/Resources.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProjectDetail from "./components/Dashboard/ProjectDetail.jsx";
import Signup from "./pages/Signup.jsx";

// Optional placeholder
const Placeholder = ({ title }) => (
  <div className="mx-auto max-w-7xl px-6 py-24">
    <h1 className="text-3xl font-bold">{title}</h1>
    <p className="mt-3 text-slate-600">Content coming soon.</p>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
