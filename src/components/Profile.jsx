import React from "react";
import EditProfile from "./EditProfile";
import Card from "./Card";
import { useSelector } from "react-redux";
const Profile = () => {
  const userData = useSelector((store) => store.user);
  return (
    <div className="flex items-center justify-between mx-3 gap-x-6">
      <EditProfile data={userData}/>
      <Card data={userData} showButtons={false}/>
    </div>
  );
};

export default Profile;
