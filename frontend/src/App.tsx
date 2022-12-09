import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import './App.css';
import ProgTerm from './components/ProgTerm';
import { Authentication } from './components/Authentication';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { auth0Domain, auth0ClientId } from './appsettings';

function App() {
  return (
    <div className="App">
      <Auth0Provider domain={auth0Domain} clientId={auth0ClientId} redirectUri={window.location.origin}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProgTerm />} />
            <Route path="/sign-in" element={<Authentication />} />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </div>
  );
}

export default App;
