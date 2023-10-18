import { useState, useEffect,useContext} from 'react'
import Editor from './Editor'
import '../App.css'
import useLocalStorage from '../hooks/localstorage';
import NavComponent from './Navbar';
import { SettingsContext } from './App';


import Nav from 'react-bootstrap/Nav';




export default function WebEditor() {
  const [html, setHTML] = useLocalStorage('html',"");
  const [css, setCss] = useLocalStorage('css',"");
  const [js, setJs] = useLocalStorage('js',"");
  const [srcDoc,setSrcDoc]=useState('');
  const [tabstate,setTabstate]=useState(1);

  const { editor, setEditor, theme, setTheme, tabornot, setTabornot, autorun, setAutorun } = useContext(SettingsContext)


  useEffect(()=> {
    if(autorun)
{
    const timeout= setTimeout(() => {
    setSrcDoc(`<html><style>${css}</style><body>${html}</body><script>${js}</script></html>`)
  }, 750);

  return ()=> clearTimeout(timeout);
}
},[html,css,js]);

const runbtnstyle={position:'absolute',right:0,top:0, fontSize:'16px'};




  return (
    <>
      <NavComponent/>
      
        {!tabornot?
        <><div className='pane top-pane d-inline d-md-flex'>
          <Editor language="xml" displayname="HTML" value={html} onChange={setHTML} />
          <Editor language="css" displayname="CSS" value={css} onChange={setCss}/>
          <Editor language="javascript" displayname="JS" value={js} onChange={setJs} />
          </div>
        </>
        :<>
        <Nav variant="tabs" defaultActiveKey="link-1" data-bs-theme="dark">
            <div className="d-flex pl-3">
              <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={()=>setTabstate(1)} className='xml'>HTML</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={()=>setTabstate(2)} className='css'>CSS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-3" onClick={()=>setTabstate(3)} className='javascript'>JS</Nav.Link>
              </Nav.Item>
            </div>
          </Nav>

          {tabstate==1 &&
            <div className='pane top-pane'>
            <Editor language="xml" displayname="HTML" value={html} onChange={setHTML} />
            </div>
            }
          {tabstate==2 &&
            <div className='pane top-pane'>
            <Editor language="css" displayname="CSS" value={css} onChange={setCss} />
            </div>
            }
            {tabstate==3 &&
            <div className='pane top-pane'>
            <Editor language="javascript" displayname="JS" value={js} onChange={setJs} />
            </div>
            }

            </>
        }
          

      <div className='pane' style={{position:'relative'}}>
          <iframe 
          srcDoc={srcDoc}
          title='output' 
          sandbox='allow-scripts'
          width='100%'
          height="100%"
          ></iframe>
          {!autorun && <button onClick={()=>setSrcDoc(`<html><style>${css}</style><body>${html}</body><script>${js}</script></html>`)} style={runbtnstyle}> Run</button>}
      </div>
    </>
  )
}


