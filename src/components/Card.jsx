import React, { useState } from "react";
import AnimatedWrapper from "./AnimatedWrapper";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const Card = ({ data, showButtons }) => {
  const {
    _id,
    firstName,
    lastName,
    gender,
    age,
    bio,
    profilePicture,
    location,
    skills,
  } = data;
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Track image loading state
  const dispatch = useDispatch();
  const sendRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + `connectionRequest/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(id));
      console.log(data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  if (!data) return;
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg font-semibold">No users available</h1>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <AnimatedWrapper className="card bg-base-200 w-96 shadow-sm flex flex-col">
        <figure className="relative flex-shrink-0 h-1/3 w-full">
          <div className="relative h-full w-full">
            {!isImageLoaded && <div className="skeleton h-full w-full"></div>}
            <img
              src={profilePicture}
              alt="Profile picture"
              className="rounded-t-xl h-full w-full object-cover"
              loading="lazy"
              onLoad={() => {
                setIsImageLoaded(true);
              }}
            />
            {/* Gradient overlay applied only to the image */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-base-200 to-transparent pointer-events-none z-10"></div>
          </div>
        </figure>
        <div className="card-body flex-grow items-start text-left">
          <div className="w-full text-left">
            <h2 className="card-title">
              {firstName + " " + lastName + ","}
              <span className="font-normal">{age}</span>
            </h2>
          </div>
          <p className="text-sm text-gray-500">{gender}</p>
          <p className="text-sm text-gray-500">{location}</p>
          <p className="text-sm text-gray-500">{skills.join(", ")}</p>
          <p>{bio}</p>
          {showButtons && <div className="card-actions flex justify-between w-full">
            <button className="btn" onClick={() => sendRequest("pass", _id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="size-[1.2em]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Pass
            </button>
            <button
              className="btn"
              onClick={() => sendRequest("interested", _id)}
            >
              Like
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="size-[1.2em]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>}
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default Card;
