import React, { useState,useContext } from "react";
import  Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Settingsbar from "./Settings";
import { SettingsContext } from "./App";
import '../App.css'

function NavComponent() {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const { editor, setEditor, theme, setTheme, tabornot, setTabornot, autorun, setAutorun } = useContext(SettingsContext);
  
  return (
    <>
    <Navbar expand="md" className="bg-body-tertiary" data-bs-theme="dark">
      <Navbar.Brand className="brand-name">CodeWrite</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Container className="ml-auto">
          <Nav variant="tabs" defaultActiveKey={editor=="webeditor"?"link-1":"link-2"} data-bs-theme="dark">
            <Container className="d-md-flex">
              <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={()=>setEditor('webeditor')}>Web Editor</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={()=>setEditor('markdown')}>Markdown editor</Nav.Link>
              </Nav.Item>
            </Container>
            <Nav.Item className="ml-auto">
              <Button variant="dark" className="text-light" data-bs-theme="dark" onClick={() => setSettingsOpen(!isSettingsOpen)}>
              &#9881;
              </Button>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
    <Settingsbar isSettingsOpen={isSettingsOpen}/>
    </>
  );
}

export default NavComponent;