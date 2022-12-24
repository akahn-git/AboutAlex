import React from 'react';
import quake4gif from '../../gifs/Quake4.gif'; // Import the GIF file for the project
import '../../App.css'; // Import the CSS file

const Quake4 = () => {
  return (
    <div className="project-page">
      <div className="project-page__header">
        <h2 className="project-page__title">Quake 4 Pac Man Mod</h2>
        <a href="https://github.com/akahn-git/GameModMidterm2022.git" rel="noopener noreferrer" target="_blank" className="project-page__link">
          Download on GitHub
        </a>
      </div>
      <div className="project-page__content">
        <div className="project-page__gif">
          <img src={quake4gif} alt="quake4 gif" />
        </div>
        <div className="project-page__description">
          <p>
            This mod allows the player to become Pac Man and navigate through his maze collecting points. I added a points system for the player and changed the ammo pickups to become different Pac Man collectible items.
          </p>
          <p>
            To test the setup of the Pac Man level, type "pacman" into the command line and you will be teleported into the Pac Man level. To test the pellets, fruit, and power pellets, you can collect a shotgun ammo and receive 10 points, collect fruit and get 100 points, or collect the power pellets and receive 50 points and the ability to kill the enemies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Quake4;
