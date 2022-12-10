import quake2 from '../images/Quake2.jpg'
import quake4 from '../images/Quake4.jpg'
import twitter from '../images/Twitter.jpg'
import flixster from '../images/Flixster.jpg'
import ProjectButton from '../widgets/projectButtons'
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
          <ProjectButton/>
        </div>

        <div>
          <Link to="./projects/quake4">Quake4 PacMan Mod</Link>
        </div>

        <div>
          <img src={quake4} alt ="quake4" class ="left" />
        </div>
          
        <div>
          <ProjectButton/>
        </div>

        <div>
          <Link to="./projects/twitter">Twitter Android App</Link>
        </div>

        <div>
          <img src={twitter} alt ="twitter" />
        </div>

        <div>
          <ProjectButton/>
        </div>

        <div>
          <Link to="./projects/flixster">Flixster Andorid App</Link>
        </div>

        <div>
          <img src={flixster} alt ="flixster" />
        </div>

        <div>
          <ProjectButton/>
        </div>

        
    </div>
    );
  }
  
  export default Projects;