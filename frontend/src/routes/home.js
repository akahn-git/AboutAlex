import React from 'react';
import '../App.css';  // Import the CSS file
import profilePic from '../images/alex.JPG'
const Home = () => {
  return (
    <div className="home-page">
      <h1>About Alex</h1>
      <img src={profilePic} alt="My profile" />
      <p>
        Hi, I'm Alex and I'm a computer science student with a passion for software development and problem-solving. My goal is to become a full-stack developer and work on projects that make a positive impact in the world.
      </p>
      <p>
        I'm currently pursuing my Master's degree in Computer Science at the New Jersey Institue of Technology, where I've had the opportunity to learn from experienced professors and work on a variety of projects. I've also completed a Bachelor's degree in Computer Science and have gained practical experience through internships and freelance work.
      </p>
      <p>
        In my spare time, I enjoy learning new technologies and frameworks, participating in hackathons, and contributing to open-source projects. I'm always looking for new opportunities to grow and challenge myself, and I'm excited to see where my career in computer science takes me.
      </p>
    </div>
  );
}

export default Home;