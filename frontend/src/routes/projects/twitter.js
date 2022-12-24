import React from 'react';
import twittergif from '../../gifs/twitter2.gif'; // Import the GIF file for the project
import '../../App.css'; // Import the CSS file

const Twitter = () => {
  return (
    <div className="project-page">
      <div className="project-page__header">
        <h2 className="project-page__title">Twitter Clone</h2>
        <a href="https://github.com/akahn-git/GameModMidterm2022.git" rel="noopener noreferrer" target="_blank" className="project-page__link">
          Download on GitHub
        </a>
      </div>
      <div className="project-page__content">
        <div className="project-page__gif">
          <img src={twittergif} alt="twitter gif" />
        </div>
        <div className="project-page__description">
          <p>
          The user can open the Twitter app offline and see the last loaded tweets, which are persisted in SQLite. Tweets are refreshed on every application launch. While "live data" is displayed when the app can get it from the Twitter API, it is also saved for use in offline mode. If the user leaves the compose view without publishing and there is existing text, the app will prompt the user to save or delete the draft. If saved, the draft is persisted to disk and can later be resumed from the compose view. The app is also enabled to receive implicit intents from other apps. When a link is shared from a web browser, it will pre-fill the text and title of the web page when composing a tweet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Twitter;
