import React, { useState, useContext } from "react";
import { User, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(username, password);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-emerald-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-slate-600 text-center mb-8">
          Sign in to continue to{" "}
          <span className="font-semibold text-emerald-600">Carbon OS</span>
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <div className="flex items-center border border-slate-300 rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-slate-400 mr-2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full outline-none bg-transparent text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-slate-300 rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 text-slate-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full outline-none bg-transparent text-slate-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-500 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Login"}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>

          <p className="text-sm text-center text-slate-500">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-emerald-600 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
