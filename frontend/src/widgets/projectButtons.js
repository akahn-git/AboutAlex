import React, { useState } from "react";

import Like from '../images/Like.svg'
import Follow from '../images/Follow.svg'

import cn from "classnames"

import "../styles.scss";

const LikeButton = () => {
    const [liked, setLiked] = useState(null);

     return (
        <button
            onClick={() => setLiked(!liked)}
            //onAnimationEnd={() => setClicked(false)}
            className={cn("like-button-wrapper", {
                liked,
            })}
        >
            <div className="like-button">
                <img src={Like} alt ="Like" />
                <span>Like</span>
                <span className={cn("suffix", { liked })}>d</span>
            </div>
        </button>
    );
}

const FollowButton = () => {
    const [followed, setFollowed] = useState(null);

    return(
        <button
            onClick={() => setFollowed(!followed)}
            //onAnimationEnd={() => setClicked(false)}
            className={cn("follow-button-wrapper", {
                followed,
            })}
        >
            <div className="follow-button">
                <img src={Follow} alt ="Follow" />
                <span>Follow</span>
                <span className={cn("suffix", { followed })}>ed</span>
            </div>
        </button>
    );
}

const ProjectButtons = () => {
    return(
        <div>
            <LikeButton/> <FollowButton/>
        </div>
    );
}

export default ProjectButtons;