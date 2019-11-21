import React, {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import axios from 'axios';


import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';

import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';

import DriverProfile from './components/DriverProfile';

function App() {
  const [driverList, setDriverList] = useState([]);

  useEffect(() => {
    axios.get('https://swapi.co/api/people')
        .then(res => setDriverList(res.data.results))
        .catch(err => console.log(`Error: ${err}`))
  },[])

  return (
    <div className="App">
      <HeaderNav />
      <Switch>
        <Route exact path="/" render={props => <LoginPage {...props} formToDisplay="default" />} />

        <Route path="/Login" render={props => <LoginPage {...props} formToDisplay="default" />} />
        <Route path="/NewMother" render={props => <LoginPage {...props} formToDisplay="newMother" />} />
        <Route path="/NewDriver" render={props => <LoginPage {...props} formToDisplay="newDriver" />} />
        
        {/* Profile Routes */}
        <Route exact path="/Driver" render={props => <DriverProfile {...props} isLoggedIn={true} driverList={driverList} driver={driverList[0]} />} />
        <Route path="/Driver/:id" render={props => <DriverProfile {...props} isLoggedIn={false} driver={driverList[props.match.params.id]} />} />
        <Route path="/Profile" render={props => <UserProfile {...props} driverList={driverList} />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
