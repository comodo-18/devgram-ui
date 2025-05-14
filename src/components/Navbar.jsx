/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../utils/userSlice";
import { motion } from "framer-motion";
import { removeFeedItem } from "../utils/feedSlice";
import Profile from "./Profile";
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
      dispatch(clearUser());
      dispatch(removeFeedItem());
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Devgram
        </Link>
      </div>
      <div className="flex-none">
        <div
          className="dropdown dropdown-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {user && (
            <div className="flex items-center  mr-2">
              <motion.p
                className="mx-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                Welcome {user.firstName + " " + user.lastName}
              </motion.p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                onClick={toggleDropdown}
                ref={dropdownRef}
                onBlur={() => setIsDropdownOpen(false)}
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.profilePicture}
                    className="dropdown dropdown-end"
                  />
                </div>
              </div>
            </div>
          )}
          {isDropdownOpen && (
            <motion.ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              initial={{ opacity: 0, y: -10 }} // Start hidden and slightly above
              animate={{ opacity: 1, y: 0 }} // Fade in and slide down
              exit={{ opacity: 0, y: -10 }} // Fade out and slide up
              transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={toggleDropdown}
                >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to='/connections' onMouseDown={(e)=>e.preventDefault()} onClick={toggleDropdown}>Connections</Link>
              </li>
              <li>
                <Link to='/requests' onMouseDown={(e)=>e.preventDefault()} onClick={toggleDropdown}>Requests</Link>
              </li>
              <li>
                <a
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </motion.ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
