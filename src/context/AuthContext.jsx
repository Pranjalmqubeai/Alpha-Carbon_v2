import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../BaseUrl";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const navigate = useNavigate();

  // --- LOGIN ---
  const login = async (username, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login/`, {
        username,
        password,
      });

      const { access, refresh, user } = res.data;

      setAccessToken(access);
      setRefreshToken(refresh);
      setUser(user);

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data);
      alert("Invalid credentials. Please try again.");
    }
  };

  // --- SIGNUP ---
  const signup = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup/`, data);
      alert("Signup successful! Please log in.");
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error.response?.data);
      alert("Signup failed. Check your details.");
    }
  };

  // --- LOGOUT ---
  const logout = async () => {
    try {
      if (refreshToken) {
        await axios.post(`${BASE_URL}/api/auth/logout/`, { refresh: refreshToken });
      }
    } catch (err) {
      console.log("Logout error:", err);
    }
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.clear();
    navigate("/signin");
  };

  const contextData = { user, accessToken, login, signup, logout };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
