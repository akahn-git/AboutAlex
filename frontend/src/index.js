import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FrontendApp from './FrontendApp';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-tbp0jcraubgk3uge.us.auth0.com"
      clientId="WlRBVGux86UjtaQQk8jCJLaX0DAOE039"
      redirectUri={window.location.origin}
    >
      <FrontendApp />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
