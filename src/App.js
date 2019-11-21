import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';

import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';

import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';

import DriverProfile from './components/DriverProfile';

function App() {
  return (
    <div className="App">
      <HeaderNav />

      <Route path="/Login" render={props => <LoginPage {...props} formToDisplay="default" />} />
      <Route path="/NewMother" render={props => <LoginPage {...props} formToDisplay="newMother" />} />
      <Route path="/NewDriver" render={props => <LoginPage {...props} formToDisplay="newDriver" />} />
      
      {/* Profile Routes */}
      <Route path="/Driver" component={DriverProfile} />
      <Route path="/Profile" component={UserProfile} />

      <Footer />
    </div>
  );
}

export default App;
