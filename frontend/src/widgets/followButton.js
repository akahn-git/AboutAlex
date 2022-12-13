import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import cn from "classnames";

import Follow from '../images/Follow.svg';

const FollowButton = (props) => {
  const [followed, setFollowed] = useState(null);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { user } = useAuth0();

  const handleClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    // Make the HTTP request to follow the project here, since the user is authenticated
    axios.post(`/follow/${props.projectName}/${user.id}`)
      .then(response => {
        // Update the followed state variable
        setFollowed(true);
      })
      .catch(error => {
        // Handle the error
      });
  };

  return (
    <button
      onClick={handleClick}
      //onAnimationEnd={() => setClicked(false)}
      className={cn("follow-button-wrapper", {
        followed,
      })}
    >
      <div className="follow-button">
        <img src={Follow} alt="Follow" />
        <span>Follow</span>
        <span className={cn("suffix", { followed })}>ed</span>
      </div>
    </button>
  );
};

export default FollowButton;

