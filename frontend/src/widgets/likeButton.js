import React, { useState } from "react";
import { useEffect } from "react";

import Like from '../images/Like.svg'

import cn from "classnames"
import axios from "axios"

import "../styles.scss";

const LikeButton = (props) => {
    const [liked, setLiked] = useState(null);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        // Send a GET request to the /like/:projectName route,
        // passing in the project name as the request parameter
        axios.get(`/like/${props.projectName}`)
          .then(res => {
            // Update the state with the number of likes from the response
            setLikes(res.data.likes);
          })
          .catch(err => {
            // Handle any errors
          });
      }, [props.projectName,likes]);
    

     return (
        <button
            onClick={() => {
                setLiked(!liked)
                
                // Check if the like button has already been clicked
                if (liked) {
                // Decrement the number of likes in the state
                setLikes(prevLikes => prevLikes - 1);

                // Send a DELETE request to the /like/:projectName route,
                // passing in the project name as the request body
                axios.delete(`/like/${props.projectName}`, {
                    projectName: props.projectName
                })
                .then(res => {
                    // Handle the response from the server
                    // Update the state with the updated number of likes from the response
                    // if necessary
                    setLikes(res.data.likes);
                })
                .catch(err => {
                    // Handle any errors
                });
                } else {
                    // Increment the number of likes in the state
                    setLikes(prevLikes => prevLikes + 1);

                    // Send a POST request to the /like/:projectName route,
                    // passing in the project name as the request body
                    axios.post(`/like/${props.projectName}`, {
                        projectName: props.projectName
                    })
                    .then(res => {
                    // Handle the response from the server
                    // Update the state with the updated number of likes from the response
                    // if necessary
                    setLikes(res.data.likes);
                    })
                    .catch(err => {
                        // Handle any errors
                    });
  }

            }}
            //onAnimationEnd={() => setClicked(false)}
            className={cn("like-button-wrapper", {
                liked,
            })}
        >
            <div className="like-button">
            {/* Display the thumb image */}
            <img src={Like} alt="Like" />

            {/* Display the "Like" text */}
            <span>Like</span>

            {/* Display the "d" suffix */}
            <span className={cn("suffix", { liked })}>d</span>

            {/* Display the number of likes for the project */}
            <span className="like-count">{likes}</span>
      </div>
        </button>
    );
}

export default LikeButton;