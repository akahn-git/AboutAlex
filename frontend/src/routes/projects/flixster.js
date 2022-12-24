import flixstergif from '../../gifs/Flixster2.gif';
import '../../App.css';

const Flixster = () => {
  return (
    <div className="project-page">
      <div className="project-page__header">
        <h2 className="project-page__title">Flixster</h2>
        <a href="https://github.com/akahn-git/Flixster_Part_2.git" rel="noopener noreferrer" target="_blank" className="project-page__link">
          Download on GitHub
        </a>
      </div>
      <div className="project-page__content">
        <div className="project-page__gif">
          <img src={flixstergif} alt="flixster gif" />
        </div>
        <div className="project-page__description">
          <p>
          This project is a movie viewing app that allows users to view a list of movies sourced from the The Movie Database API. The app has two main features: exposing movie details in a separate activity and allowing video posts to be played in full-screen using the YouTubePlayerView. The first feature allows users to view detailed information about a movie, such as its ratings, popularity, and synopsis, while the second feature allows users to watch movie trailers in full-screen mode. In addition to these core features, the app also includes a number of additional enhancements, such as the ability to change the background color, style the icon, style the ActionBar and notification bar, and add an icon for the app. These enhancements help to improve the overall user experience and make the app more visually appealing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Flixster;
