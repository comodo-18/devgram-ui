/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
const EditProfile = ({ data }) => {
  const [firstName, setFirstName] = useState(data.firstName); // State to track first name
  const [lastName, setLastName] = useState(data.lastName); // State to track last name
  const [age, setAge] = useState(data.age || ""); // State to track age
  const [location, setLocation] = useState(data.location || ""); // State to track location
  const [profilePicture, setProfilePicture] = useState(data.profilePicture || ""); // State to track profile picture URL
  const [bio, setBio] = useState(data.bio || ""); // State to track bio
  const [skills, setSkills] = useState(data.skills || ""); // State to track skills
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown
  const [gender, setGender] = useState(data.gender); // State to track selected gender
  const genders = ["male", "female", "others"]; // Dropdown options
  const [toastVisible, setToastVisible] = useState(false); // State to track toast visibility
  const dispatch = useDispatch();

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender); // Update selected gender
    setIsDropdownOpen(false); // Close dropdown
  };

  const handleSubmit = async (e) => {
    try {
        let updateSkills = typeof skills !== 'string'? skills : skills.split(",").map((skill) => skill.trim());
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          firstName,
          lastName,
          age,
          location,
          profilePicture,
          bio,
          gender,
          skills: updateSkills,
        },
        { withCredentials: true }
      );
      setToastVisible(true); // Show toast on successful submission
      setTimeout(() => {
        setToastVisible(false); // Hide toast after 2 seconds
      }, 2000); // Hide toast after 2 seconds
      dispatch(setUser(res.data));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="card w-96 bg-base-100 card-md shadow-sm">
      <div className="card-body">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">What is your First name?</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">What is your Last name?</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">What is your age?</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">What is your gender?</legend>
          <div className="relative">
            <button
              className="input w-full text-left flex justify-between items-center  cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() => setIsDropdownOpen(false)}
              onChange={() => setGender(gender)} // Prevent focus loss
            >
              <span
                className={`${gender ? "text-black" : "text-gray-400"}`} // Apply gray color for placeholder-like text
              >
                {gender || "Select gender"}
              </span>
              <span
                className={`ml-2  cursor-pointer transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ^
              </span>
            </button>
            {isDropdownOpen && (
              <motion.ul
                className="absolute z-10 bg-base-100 border border-gray-300 rounded-md shadow-md mt-1 w-full"
                initial={{ opacity: 0, y: -10 }} // Start hidden and slightly above
                animate={{ opacity: 1, y: 0 }} // Fade in and slide down
                exit={{ opacity: 0, y: -10 }} // Fade out and slide up
                transition={{ duration: 0.3, ease: "easeOut" }}
                onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
              >
                {genders.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleGenderSelect(option)}
                  >
                    {option}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Where do you live?</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <p className="label">Optional</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Your skills</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <p className="label">Optional</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Your profile picture url</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Your bio</legend>
          <textarea
            className="textarea h-24"
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </fieldset>
        <button className="btn btn-active btn-warning" onClick={handleSubmit}>
          Submit
        </button>
        {toastVisible && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Changes made successfully!!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
