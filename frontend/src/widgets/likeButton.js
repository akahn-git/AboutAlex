import React, { useState } from "react";
import { useEffect } from "react";

import Like from '../images/Like.svg'

import cn from "classnames"
import axios from "axios"

import { useAuth0 } from "@auth0/auth0-react";

import "../styles.scss";

const LikeButton = (props) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const { user } = useAuth0();

    useEffect(() => {
        // Make an HTTP request to get the number of likes for the project
        axios.get(`/likes/${props.projectName}`)
          .then(response => {
            // Update the likes state variable with the number of likes
            setLikes(response.data.likes || 0);
          })
          .catch(error => {
            // Handle the error
            console.error(error);
          });
      
        if (isAuthenticated && user) {
          // Make an HTTP request to get the list of projects that the user has liked
          axios.get(`/liked-projects/${user.sub}`)
            .then(response => {
              // Check if the response data is defined
              if (response.data && response.data.projects) {
                // Check if the user has liked the current project
                if (response.data.projects.includes(props.projectName)) {
                  // Update the liked state variable
                  setLiked(true);
                } else {
                  // Set the liked state variable to false if the user has not liked the project
                  setLiked(false);
                }
              }              
            })
            .catch(error => {
              // Handle the error
              console.error(error);
            });
        }
    }, [isAuthenticated, props.projectName, user]);
          
    const handleClick = () => {
        if (!isAuthenticated) {
            loginWithRedirect();
            return;
        }
        setLiked(!liked);

        // Check if the like button has already been clicked
        if (liked) {

        setLikes(likes - 1);
        // Send a DELETE request to the /like/:projectName route,
        // passing in the project name and user sub as the request body
        axios.delete(`/unlike-project/${props.projectName}`)
        .then(res => {
            // Handle the response from the server
            // Update the state with the updated number of likes from the response
            // if necessary
        })
        .catch(err => {
            // Handle any errors
        });

        axios.delete(`/unlike-user/${props.projectId}/${user.sub}`)
        .then(res => {
        // Handle the response from the server
        })
        .catch(err => {
        // Handle any errors
        });
    } else {
        setLikes(likes + 1)

        axios.post(`/like-project/${props.projectName}`)
        .then(res => {
          // Handle the response from the server
        })
        .catch(err => {
        // Handle any errors
        });

        axios.post(`/like-user/${props.projectId}/${user.sub}`)
        .then(res => {
        // Handle the response from the server
        })
        .catch(err => {
        // Handle any errors
        });
  }
}
  
return (
  <button
    onClick={handleClick}
    className={cn("like-button-wrapper", { liked })}
  >
    <div className="like-button">
      <img src={Like} alt="Like" />
      <span>Like</span><span className={cn("suffix", { liked })}>d</span>
    </div>
    <span className="likes-count">{likes}</span>
  </button>
);

}

export default LikeButton;