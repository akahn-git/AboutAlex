import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Projects from './routes/projects';
import Profile from './routes/profile';
import Header from './widgets/header';
import Quake2 from './routes/projects/quake2';
import Quake4 from './routes/projects/quake4';
import Twitter from './routes/projects/twitter';
import Flixster from "./routes/projects/flixster";
import Home from "./routes/home"
import './App.css';

const ProtectedRoute = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();

    return <>Redirecting to login..</>;
  }

  return <Outlet />;
};

const FrontendApp = () => {
  const { isLoading } = useAuth0();

  return (
    !isLoading && <BrowserRouter>
      <div className="app-content">
        <Header/>

        <div className="app-content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/projects" element={<Projects />} />

            <Route path="/projects/quake2" element={<Quake2 />} />

            <Route path="/projects/quake4" element={<Quake4 />} />

            <Route path="/projects/twitter" element={<Twitter />} />

            <Route path="/projects/flixster" element={<Flixster />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default FrontendApp;
