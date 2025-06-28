import React, { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
const Signup = () => {
  const { callApi, data, isPending, error } = useApi();
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    if (data) {
      console.log("DATA", data);
      // Handle the populated data here
    }
    if (error) {
      setAuthError(error);
    }
  }, [data, error]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }
    await callApi("auth/signup", "POST", {
      email: email,
      username: username,
      password: password,
    });

    if (error) {
      // console.log("Error", error);

      setAuthError(error);
    }

    console.log(data);
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 ">Sign up for ExpenseInsights</h2>
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
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text ">Username</span>
            </label>
            <input
              className="input input-bordered w-full bg-inherit "
              id="username"
              type="username"
              name="username"
              placeholder="johndoe"
              onChange={(e) => setUsername(e.target.value)}
              required
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
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="confirm-password">
              <span className="label-text">Confirm password</span>
            </label>
            <input
              className="input input-bordered w-full bg-inherit"
              id="confirm-password"
              type="password"
              name="confirm-password"
              placeholder="**********"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-primary text-white w-full mt-14"
            type="submit"
            onClick={handleSignUp}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
