import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constant";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await axios.post(BASE_URL + "login", {
            email,
            password
          }, {withCredentials: true});   
          console.log("Login successful:", res);
          dispatch(setUser(res.data));
          navigate("/feed");
    } catch (error) {
        console.error("Error logging in:", error);
    }
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
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
          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-warning">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
