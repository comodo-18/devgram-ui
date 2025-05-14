import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import Card from "./Card";
const Feed = () => {
  const user = useSelector((store) => store.user);
  const feedData = useSelector((store) => store.feed);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!user) {
    navigate("/login");
  }
  const fetchFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });
      dispatch(setFeed(res.data.allusersOnFeed));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {feedData && <Card data={feedData[0]}/>}
    </>
  );
};

export default Feed;
