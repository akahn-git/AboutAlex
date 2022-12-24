import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"

const Profile = () => {
  const { user } = useAuth0();
  const [followedProjects, setFollowedProjects] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);
  //const [userFromDb, setUserFromDb] = useState(null);

  useEffect(() => {
    if (user) {
      // Make a call to the `/user/:sub` route to get the user from the database (this makes sure they are in the database or added)
      axios.get(`/user/${user.sub}`)
        .then(response => {
          // Update the component state with the user from the database
          //setUserFromDb(response.data);
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
  
      // Make a call to the `/followed-projects/:sub` route to get the user's followed projects
      axios.get(`/followed-projects/${user.sub}`)
        .then(response => {
          // Update the component state with the user's followed projects
          setFollowedProjects(response.data);
          console.log("Followed projects from server:", response.data);
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });

      // Make a call to the `/liked-projects/:sub` route to get the user's liked projects
      axios.get(`/liked-projects/${user.sub}`)
        .then(response => {
          // Update the component state with the user's liked projects
          setLikedProjects(response.data);
          console.log("Liked projects from server:", response.data);
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    }
  }, [user]);  
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="profile">
      <div className="profile__name">{user.name}</div>
      <div className="profile__email">{user.email}</div>
  
      <div className="profile__followed-projects">
        <div className="profile__followed-projects-title">Followed Projects:</div>
        {JSON.stringify(followedProjects)}
      </div>
  
      <div className="profile__liked-projects">
        <div className="profile__liked-projects-title">Liked Projects:</div>
        {JSON.stringify(likedProjects)}
      </div>
    </div>
  );  
};

export default Profile;
