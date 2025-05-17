/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { motion } from "framer-motion";
import AnimatedWrapper from "./AnimatedWrapper";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // PrimeReact core CSS
import "primeicons/primeicons.css"; // PrimeIcons CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true); // State to toggle between login and signup forms
  const [error, setError] = useState(null);
  const [errorKey, setErrorKey] = useState(0); // State to trigger animation
  const [showPassword, setShowPassword] = useState(false);
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
                    className="input input-bordered w-full"
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
                    className="input input-bordered w-full"
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
                className="input input-bordered w-full"
                onChange={handEmailChange}
                value={email}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text mb-1.5">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-12" // Add padding to match other fields and leave space for the icon
                  onChange={handlePasswordChange}
                  value={password}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center z-10" // Properly position the icon
                  onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
                >
                  <i
                    className={`pi ${
                      showPassword ? "pi-eye-slash" : "pi-eye"
                    } text-gray-500 cursor-pointer`}
                  />
                </button>
              </div>
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
