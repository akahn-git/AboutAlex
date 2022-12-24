import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()}>Log in</button>
  );
};


const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
  );
};

const UserActions = () => <>
  <Link to="/profile" className="link">Profile</Link> / <LogoutButton />
</>;

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="app-header">
      <div className="app-header-lhs">
        <div className="app-header-name">Alex Kahn</div>
        <div className="app-header-title">Computer Programmer</div>
      </div>
      <div className="app-header-rhs">
        <Link to="/" className="link">About Alex</Link>
        <Link to="/blog" className="link">Blog</Link>
        <Link to="/projects" className="link">Projects</Link>
        <a href="https://github.com/akahn-git" className="app-header-a" rel="noopener noreferrer" target="_blank">Github</a>
      </div>
      <div className="app-header-rhs">
        {isAuthenticated ? <UserActions /> : <LoginButton />}
      </div>
    </div>
  );
};

export default Header;