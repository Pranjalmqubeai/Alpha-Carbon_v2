// src/routes/ProtectedRoute.jsx
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import BASE_URL from "../BaseUrl";

// (Optional) lightweight JWT exp check
const isExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp <= now;
  } catch {
    return true;
  }
};

export default function ProtectedRoute() {
  const { user, accessToken, refreshToken, setTokensAndUser, logout } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const maybeRefresh = async () => {
      // If we appear logged in, or we have no refresh token, no need to refresh here
      if (accessToken && !isExpired(accessToken)) {
        setChecking(false);
        return;
      }
      if (!refreshToken) {
        setChecking(false);
        return;
      }
      // Try refresh
      try {
        const res = await axios.post(`${BASE_URL}/api/auth/refresh/`, { refresh: refreshToken });
        const newAccess = res.data?.access;
        if (newAccess) {
          const savedUser = localStorage.getItem("user");
          setTokensAndUser({ access: newAccess, refresh: refreshToken, user: savedUser ? JSON.parse(savedUser) : null });
        }
      } catch {
        await logout(); // clears storage and redirects on next render
      } finally {
        setChecking(false);
      }
    };
    maybeRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) return null; // or a loader

  if (!accessToken || isExpired(accessToken) || !user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
