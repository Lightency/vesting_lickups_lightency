import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

// Components
import Vesting from './components/Vesting';
import Home from './components/Home';

// Images
import LightLogo from "./assets/Light.png"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img src={LightLogo}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='mx-auto'></Nav>
            <Nav>
              <Nav.Link href='/vesting'>Vesting</Nav.Link>
              <Nav.Link onClick={window.accountId===''?login:logout}>
                {window.accountId===''?'Login':window.accountId}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/vesting" element={<Vesting />}/>
      </Routes>
    </BrowserRouter>
  );
}
