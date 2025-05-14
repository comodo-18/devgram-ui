import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setRequest } from "../utils/requestSlice";
import { removeRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "user/getInterestedConnectionRequests",
        { withCredentials: true }
      );
      dispatch(setRequest(res.data.allRequests));
      console.log(res.data.allRequests);
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + `connectionRequest/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
      console.log(res.data);
      fetchRequests();
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };
  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!requests) return;
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg font-semibold">No requests available</h1>
      </div>
    );
  }
  return (
    <div className="w-1/3 mx-auto mt-10 flex flex-col min-h-screen justify-start">
      <h1 className="text-2xl font-semibold text-center my-5">
        Pending Requests
      </h1>
      {requests &&
        requests.map((request) => (
          <ul
            key={request.id}
            className="list bg-base-200 rounded-box shadow-md w-full my-5"
          >
            <li className="list-row flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <img
                  className="size-20 rounded-box"
                  src={request.senderId.profilePicture}
                  alt={`${request.senderId.firstName} ${request.senderId.lastName}`}
                />
                <div>
                  <div className="font-medium">
                    {request.senderId.firstName} {request.senderId.lastName}
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {request.senderId.gender}, {request.senderId.age}
                  </div>
                </div>
              </div>
              <p className="list-col-wrap text-xs flex-1 mx-4">
                {request.senderId.bio}
              </p>
              <div className="flex space-x-2">
                <button
                  className="btn btn-ghost"
                  onClick={() =>
                    reviewRequest("rejected", request.senderId._id)
                  }
                >
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </g>
                  </svg>
                  Reject
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() =>
                    reviewRequest("accepted", request.senderId._id)
                  }
                >
                  Accept
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </g>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default Request;
