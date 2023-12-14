import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Settingsbar from "./Settings";
import { SettingsContext } from "./App";
import '../App.css'

function NavComponent() {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const { editor, setEditor} = useContext(SettingsContext);
  const [navbarExpanded, setNavbarExpanded] = useState(false);

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary" data-bs-theme="dark" expanded={navbarExpanded} onToggle={() => { setNavbarExpanded(!navbarExpanded); setSettingsOpen(false) }}>
        <Navbar.Brand className="brand-name">CodeWrite</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"  >
          <div className="ms-0  justify-content-start w-100">
            <Nav variant="tabs" defaultActiveKey={editor == "webeditor" ? "link-1" : "link-2"} data-bs-theme="dark" className="ms-0">
              <div className="d-md-flex ms-0">
                <Nav.Item>
                  <Nav.Link eventKey="link-1" onClick={() => setEditor('webeditor')} className="ps-3 pe-3">
                    <span className="text-warning">{"</> "}</span>Web Editor
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2" onClick={() => setEditor('markdown')} className="ps-3 pe-3">
                    <span className="text-info">M&darr;{" "}</span>Markdown editor</Nav.Link>
                </Nav.Item>
              </div>
              <Nav.Item className="ms-0 ms-md-auto ">
                <Button variant="dark" className="text-light " data-bs-theme="dark" onClick={() => setSettingsOpen(!isSettingsOpen)}>
                  &#9881;
                </Button>
              </Nav.Item>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Settingsbar isSettingsOpen={isSettingsOpen} />
    </>
  );
}

export default NavComponent;