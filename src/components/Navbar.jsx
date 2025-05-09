import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "./utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "./utils/userSlice";
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
    console.log("Logout clicked"); // Debugging log
    setIsDropdownOpen(false);
    try {
      await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  // console.log(user);
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Devgram</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          {user && (
            <div className="flex items-center  mr-2">
              <p className="mx-2">
                Welcome {user.firstName + " " + user.lastName}
              </p>
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
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
            </div>
          )}
          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
