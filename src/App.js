import React from 'react';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import Home from './Home';
import About from './About';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar className="Nav-color" variant="dark">
          <Navbar.Brand href="#home">Qualys</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/about">About</Link></Nav.Link>
            <Nav.Link><Link to="/users">Users</Link></Nav.Link>
          </Nav>
        </Navbar>

        <Routes>
          {/* Replace `component` with `element` and wrap the component in JSX */}
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
