import quake2gif from '../../gifs/Quake2.gif'
import '../../App.css';  // Import the CSS file

const Quake2 = () => {
    return (
      <div className="project-page">
        <div className="project-page__header">
          <h2 className="project-page__title">Quake 2 Fishing Mod</h2>
          <a href="https://github.com/akahn-git/Quake-2-Mod.git" rel="noopener noreferrer" target="_blank" className="project-page__link">
            Download on GitHub
          </a>
        </div>
        <div className="project-page__content">
          <div className="project-page__gif">
            <img src={quake2gif} alt="quake2 gif" />
          </div>
          <div className="project-page__description">
            <p>
              If you are tired of running and gunning through Quake 2, this mod is for you. All enemies are frozen, and so are you! You won't be able to move, but you can type 'fish' into the command prompt to start the fishing mod. You will be placed on your perch where you can fish peacefully. The mod includes a range feature for casting the line, a reeling in mini game, and 5 varieties of fish: mackerel, cod, sword fish, rainbow fish, and blue fin tuna. You can type 'spawn___' with the name of a specific fish to launch a mini game with that fish. There is also a buy menu for better poles, hooks, weight, reels, bait, and tackle that can be accessed by pressing TAB.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Quake2;