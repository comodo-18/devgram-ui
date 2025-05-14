/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { motion } from "framer-motion";
import AnimatedWrapper from "./AnimatedWrapper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errorKey, setErrorKey] = useState(0); // State to trigger animation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUser(res.data));
      navigate("/");
    } catch (error) {
      setErrorKey((prev) => prev + 1); // Increment errorKey to trigger animation
      setError(error?.response?.data);
      console.error("Error logging in:", error);
    }
  };

  return (
  <div className="flex items-center justify-center">
    <AnimatedWrapper className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body p-6">
        <h2 className="card-title text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text mb-1.5">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              onChange={handEmailChange}
              value={email}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text mb-1.5">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          {error && (
            <motion.div
              className="text-red-500 text-sm mb-2"
              key={errorKey}
              initial={{ x: 0 }}
              animate={{
                x: [0, -10, 10, -10, 10, 0],
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              {error}
            </motion.div>
          )}
          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-warning">
              Login
            </button>
          </div>
        </form>
      </div>
    </AnimatedWrapper>
  </div>
);
};

export default Login;
