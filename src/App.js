import React from 'react';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import Home from './Home';
import About from './About';
import qualysLogo from './qualys-logo.png';

import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar className="navbar-white navbar-shadow" variant="light">
          <Navbar.Brand href="#home">
            {/* Add the Qualys icon here */}
            <img src={qualysLogo} alt="Qualys Icon" style={{ width: '104px', margin: '20px'}} />
          </Navbar.Brand>
          {/* <Nav className="mr-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/about">About</Link></Nav.Link>
          </Nav> */}
        </Navbar>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
