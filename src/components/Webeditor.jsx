import { useState, useEffect, useContext } from "react";
import Editor from "./Editor";
import "../App.css";
import useLocalStorage from "../hooks/localstorage";
import NavComponent from "./Navbar";
import { SettingsContext } from "./App";
import { combineIntoHTML } from "../utils/functions";

import runbtn from "../assets/run.svg";

import Nav from "react-bootstrap/Nav";

export default function WebEditor() {
  //for storage
  const [html, setHTML] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");

  //for iframe
  const [srcDoc, setSrcDoc] = useState("");

  // handling tabs if user has enabled show as tabs
  const [tabstate, setTabstate] = useState(1);

  //for minimizing if not tabs
  const [htmlMinimize, setHtmlMinimize] = useState(false);
  const [cssMinimize, setCssMinimize] = useState(false);
  const [jsMinimize, setJsMinimize] = useState(false);

  //prevent minimizing if 2 editors are already minimized except on smaller screens, to prevent looking odd
  const handleMinimize = (fn, prevValue) => {
    let totalMinimized = htmlMinimize + cssMinimize + jsMinimize;
    if (screen.availWidth > 768) {
      if (!prevValue && totalMinimized != 2) {
        fn(true);
      } else if (prevValue) {
        fn(false);
      }
    } else {
      fn(!prevValue);
    }
  };

  const handleHtmlMinimize = () => {
    handleMinimize(setHtmlMinimize, htmlMinimize);
  };
  const handleCssMinimize = () => {
    handleMinimize(setCssMinimize, cssMinimize);
  };
  const handleJsMinimize = () => {
    handleMinimize(setJsMinimize, jsMinimize);
  };

//for tab or not nd run btn
  const { tabornot, autorun } = useContext(SettingsContext);

  useEffect(() => {
    setSrcDoc(
      `<html><style>${css}</style><body>${html}</body><script>${js}</script></html>`
    );
  }, []);

  useEffect(() => {
    if (autorun) {
      const timeout = setTimeout(() => {
        setSrcDoc(
          `<html><style>${css}</style><body>${html}</body><script>${js}</script></html>`
        );
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [html, css, js]);


// handle download all
  const handleDownloadAllClick = () => {
    const link = document.createElement('a');
    let  downloadableValue=combineIntoHTML(html,css,js);
    console.log(downloadableValue);
    const content=new Blob([downloadableValue],{type:`text/xml`,name:"index.html"});
    link.href=URL.createObjectURL(content);
    link.download="index.html";
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
  }

  return (
    <>
      <NavComponent />

      {!tabornot ? (
        <>
          <div className="pane top-pane d-inline d-md-flex">
            <Editor
              language="xml"
              displayname="HTML"
              value={html}
              onChange={setHTML}
              minimized={htmlMinimize}
              handleMinimize={handleHtmlMinimize}
              handleDownloadAllClick={handleDownloadAllClick}
            />
            <Editor
              language="css"
              displayname="CSS"
              value={css}
              onChange={setCss}
              minimized={cssMinimize}
              handleMinimize={handleCssMinimize}
            />
            <Editor
              language="javascript"
              displayname="JS"
              value={js}
              onChange={setJs}
              minimized={jsMinimize}
              handleMinimize={handleJsMinimize}
            />
          </div>
        </>
      ) : (
        <>
          <Nav variant="tabs" defaultActiveKey="link-1" data-bs-theme="dark">
            <div className="d-flex pl-3">
              <Nav.Item>
                <Nav.Link
                  eventKey="link-1"
                  onClick={() => setTabstate(1)}
                  className="xml"
                >
                  HTML
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-2"
                  onClick={() => setTabstate(2)}
                  className="css"
                >
                  CSS
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-3"
                  onClick={() => setTabstate(3)}
                  className="javascript"
                >
                  JS
                </Nav.Link>
              </Nav.Item>
            </div>
          </Nav>

          {tabstate == 1 && (
            <div className="pane top-pane">
              <Editor
                language="xml"
                displayname="HTML"
                value={html}
                onChange={setHTML}
                handleDownloadAllClick={handleDownloadAllClick}
              />
            </div>
          )}
          {tabstate == 2 && (
            <div className="pane top-pane">
              <Editor
                language="css"
                displayname="CSS"
                value={css}
                onChange={setCss}
              />
            </div>
          )}
          {tabstate == 3 && (
            <div className="pane top-pane">
              <Editor
                language="javascript"
                displayname="JS"
                value={js}
                onChange={setJs}
              />
            </div>
          )}
        </>
      )}

      <div className="pane" style={{ position: "relative" }}>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        ></iframe>
        {!autorun && (
          <button
            onClick={() =>
              setSrcDoc(`
                        <html>
                        <style>${css}</style>
                        <body>${html}</body>
                        <script>
                        ${js}
                        </script></html>`)
            }
            className="run-button"
          >
            <img src={runbtn} alt="" />
          </button>
        )}
      </div>
    </>
  );
}
