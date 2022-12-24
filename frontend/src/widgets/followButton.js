import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import cn from "classnames";

import Follow from '../images/Follow.svg';

const FollowButton = (props) => {
  const [followed, setFollowed] = useState(null);
  const [followers, setFollowers] = useState(0);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { user } = useAuth0();

  if (isAuthenticated && user) {
    // Make an HTTP request to get the list of projects that the user is following
    axios.get(`/followed-projects/${user.sub}`)
      .then(response => {
        // Check if the response data is defined
        if (response.data.projects) {
          // Check if the user is following the current project
          if (response.data.projects.includes(props.projectId)) {
            // Update the followed state variable
            setFollowed(true);
          } else {
            // Set the followed state variable to false if the user is not following the project
            setFollowed(false);
          }
        } else {
          // Handle the case where response.data or response.data.projects is undefined or null
          console.error('Error: response.data.projects is undefined or null');
        }        
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  }

  useEffect(() => {
  // Make an HTTP request to get the number of followers for the project
  axios.get(`/followers/${props.projectName}`)
    .then(response => {
      // Update the followers state variable with the number of followers
      setFollowers(response.data.followers || 0);
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });

  }, [isAuthenticated, props.projectName, user]);

    
  const handleClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
  
    setFollowed(!followed);
    
    if (followed) {
      // Make the HTTP request to unlike the project
      axios.delete(`/unlike-project/${props.projectName}`)
        .then(response => {
          // Update the followed state variable
          setFollowed(false);
        })
        .catch(error => {
          // Handle the error
        });
  
      // Make the HTTP request to remove the project from the user's list of followed projects
      axios.delete(`/unfollow-project/${props.projectId}/${user.sub}`)
        .then(response => {
          // Project was successfully removed from the user's list of followed projects
        })
        .catch(error => {
          // Handle the error
        });
  
      // Update the followers state variable
      setFollowers(followers - 1);
    } else {
      // Make the HTTP request to like the project
      axios.post(`/follow-project/${props.projectName}`)
        .then(response => {
          // Update the followed state variable
          setFollowed(true);
        })
        .catch(error => {
          // Handle the error
        });
  
      // Make the HTTP request to add the project to the user's list of followed projects
      axios.post(`/follow-user/${props.projectId}/${user.sub}`)
        .then(response => {
          // Project was successfully added to the user's list of followed projects
        })
        .catch(error => {
          // Handle the error
        });
  
      // Update the followers state variable
      setFollowers(followers + 1);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={cn("follow-button-wrapper", {
        followed,
      })}
    >
      <div className="follow-button">
        <img src={Follow} alt="Follow" />
        <span>Follow</span><span className={cn("suffix", { followed })}>ed</span>
      </div>
      <span className="followers-count">{followers}</span>
    </button>
  );
  
};

export default FollowButton;

