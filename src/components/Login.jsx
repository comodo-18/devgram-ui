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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true); // State to toggle between login and signup forms
  const [error, setError] = useState(null);
  const [errorKey, setErrorKey] = useState(0); // State to trigger animation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLoginSubmit = async (e) => {
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

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUser(res.data));
      navigate("/profile");
    } catch (error) {
      setErrorKey((prev) => prev + 1); // Increment errorKey to trigger animation
      setError(error?.response?.data);
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <AnimatedWrapper className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body p-6">
          <h2 className="card-title text-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          <form onSubmit={isLoginForm ? handleLoginSubmit : handleSignupSubmit}>
            {!isLoginForm && (
              <>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text mb-1.5">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your First Name"
                    className="input input-bordered"
                    onChange={handFirstNameChange}
                    value={firstName}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text mb-1.5">Last Name</span>
                  </label>
                  <input
                    type="test"
                    placeholder="Enter your Last Name"
                    className="input input-bordered"
                    onChange={handLastNameChange}
                    value={lastName}
                  />
                </div>
              </>
            )}
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
            <div className="flex flex-col card-actions items-center justify-center mt-4">
              <button type="submit" className="btn btn-warning">
                {isLoginForm ? "Login" : "Signup"}
              </button>
              <p
                className="cursor-pointer"
                onClick={() => setIsLoginForm((prev) => !prev)}
              >
                {isLoginForm ? "New User? Signup" : "Existing User? Login"}
              </p>
            </div>
          </form>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default Login;
