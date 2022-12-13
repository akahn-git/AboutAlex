import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"

const Profile = () => {
  const { user } = useAuth0();
  const [followedProjects, setFollowedProjects] = useState([]);
  
  useEffect(() => {
    if (user) {
      axios.get(`/user/${user.sub}/followed`)
      .then(response => response.data)
      .then(data => setFollowedProjects(data.followed_projects))
      .catch(err => {
        // Handle the error
      });      
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (Array.isArray(followedProjects) && followedProjects.length > 0) {
    // Concatenate the followed projects into a string separated by ", "
    const followedProjectsString = followedProjects.join(", ");
    
    // Use the string of followed projects in the HTML
    return (
      <div>
        <div>
          Logged in as {user.name} with sub {user.sub} and email {user.email}
        </div>

        <div>
          You are following {followedProjectsString}
        </div>
      </div>
      );
  } else {
    // If there are no followed projects, display a different message
    return(
      <div>
        <div>
          Logged in as {user.name} with sub {user.sub} and email {user.email}
        </div>
        <div>
          You are not following any projects
        </div>
      </div>
    ) 
  }  
};

export default Profile;