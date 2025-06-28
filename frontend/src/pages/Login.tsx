import React, { useState, useEffect } from "react";
// import { useApi } from "../hooks/useApi";
import { WarningCircle } from "@phosphor-icons/react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store";

const Login = () => {
  // const { callApi, data, isPending, error } = useApi();
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res?.status === 200 && res.user) {
      navigate("/dashboard");
    } else {
      setAuthError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 ">Sign in to ExpenseInsights</h2>
        <form className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text ">Email</span>
            </label>
            <input
              className="input input-bordered w-full bg-inherit "
              id="email"
              type="email"
              name="email"
              placeholder="example@expense-insights.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              {...(authError && { style: { borderColor: "red" } })}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              className="input input-bordered w-full bg-inherit"
              id="password"
              type="password"
              name="password"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
              required
              {...(authError && { style: { borderColor: "red" } })}
            />
          </div>
          <button
            className="btn btn-primary text-white w-full mt-14"
            type="submit"
            onClick={handleLogin}
          >
            Sign in
          </button>
          <span>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </span>
          {authError && (
            <div role="alert" className="alert alert-error text-white">
              <WarningCircle size={32} />
              <span className="text-white">{authError}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
