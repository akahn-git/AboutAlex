import quake2 from '../images/Quake2.jpg'
import quake4 from '../images/Quake4.jpg'
import twitter from '../images/Twitter.jpg'
import flixster from '../images/Flixster.jpg'
import LikeButton from '../widgets/likeButton'
import FollowButton from '../widgets/followButton'
import { Link } from 'react-router-dom';

const Projects = () => {
    return (
      <div>
    
        <div>
          <Link to="./projects/quake2">Quake2 Fishing Mod</Link>
        </div>

        <div>
          <img src={quake2} alt ="quake2" />
        </div>

        <div>
          <LikeButton projectName="quake2"/> <FollowButton projectName="quake2"/>
        </div>

        <div>
          <Link to="./projects/quake4">Quake4 PacMan Mod</Link>
        </div>

        <div>
          <img src={quake4} alt ="quake4" class ="left" />
        </div>
          
        <div>
          <LikeButton projectName="quake4"/> <FollowButton/>
        </div>

        <div>
          <Link to="./projects/twitter">Twitter Android App</Link>
        </div>

        <div>
          <img src={twitter} alt ="twitter" />
        </div>

        <div>
          <LikeButton projectName="twitter"/> <FollowButton/>
        </div>

        <div>
          <Link to="./projects/flixster">Flixster Andorid App</Link>
        </div>

        <div>
          <img src={flixster} alt ="flixster" />
        </div>

        <div>
          <LikeButton projectName="flixster"/> <FollowButton/>
        </div>

        
    </div>
    );
  }
  
  export default Projects;