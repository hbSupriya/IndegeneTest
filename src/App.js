import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Home, AccountTree, BarChart } from '@material-ui/icons';
import WelcomePopup from './pages/WelcomeScreen/WelcomePopup';
import Dashboard from './pages/Dashboard/Dashboard';
import Applications from './pages/ApplicationsView/Applications';
import elancologo from './assets/images_logos/elancologo.png';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tab: {
    fontSize: '0.75rem',
  },
  indicator: {
    backgroundColor: 'white',
  },
}));

function App() {
  const classes = useStyles();
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  const AppHeader = () => {
    const location = useLocation();
    const [value, setValue] = useState(getTabValueFromPath());

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function getTabValueFromPath() {
      switch (location.pathname) {
        case '/elancoResources':
          return 0;
        case '/elancoApplications':
          return 1;        
        default:
          return 0;
      }
    }

    return (
      <AppBar position="fixed" className="app-bar">
        <Toolbar className="app-tabs">
          <div className="app-logo"> <img src={elancologo} width={100} height={85}/> Elanco Dashboard </div>
          <Tabs TabIndicatorProps={{style: { backgroundColor: 'white' }}} value={value} onChange={handleChange}>
            <Tab className={classes.tab} label="Resource Dashboard" icon={<Home />} component={Link} to="/elancoResources" />
            <Tab className={classes.tab} label="Application Data" icon={<AccountTree />} component={Link} to="/elancoApplications" />
          </Tabs>
        </Toolbar>        
      </AppBar>
    );
  };

  function HomePage({ showPopup, closePopup }) {
    return (
      <React.Fragment>
        {showPopup && <WelcomePopup closePopup={closePopup} />}
        {!showPopup && <Dashboard />}
      </React.Fragment>
    );
  }

  return (
    <Router>
      <div className="App">
        <div className="app-header">
          <AppHeader />
        </div>
        <div className="app-content">
          <Routes>
            <Route
              path="/"
              element={<HomePage showPopup={showPopup} closePopup={closePopup} />}
            />
            <Route path="/elancoResources" element={<Dashboard />} />
            <Route path="/elancoApplications" element={<Applications />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
