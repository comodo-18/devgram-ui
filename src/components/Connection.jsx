import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setConnections } from "../utils/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  let isError = false;
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/viewConnectionDetails", {
        withCredentials: true,
      });
      dispatch(setConnections(res.data.connections));
      console.log(res.data.connections);
    } catch (error) {
      isError = true;
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!connections || isError) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">No connections available</p>
      </div>
    );
  }
  return (
    <div className="w-1/3 mx-auto mt-10 flex flex-col min-h-screen justify-start">
      <h1 className="text-2xl font-semibold text-center my-5">
        My Connections
      </h1>
      {connections &&
        connections.map((connection) => (
          <ul
            key={connection.id}
            className="list bg-base-200 rounded-box shadow-md w-full my-5"
          >
            <li className="list-row flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <img
                  className="size-20 rounded-box"
                  src={connection.profilePicture}
                  alt={`${connection.firstName} ${connection.lastName}`}
                />
                <div>
                  <div className="font-medium">
                    {connection.firstName} {connection.lastName}
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {connection.gender}, {connection.age}
                  </div>
                </div>
              </div>
              <p className="list-col-wrap text-xs flex-1 mx-4">
                {connection.bio}
              </p>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default Connection;
