import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Feed = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    if (!user) {
        navigate("/login");
    }
  return (
    <div>Feed</div>
  )
}

export default Feed