import { useState, useEffect} from 'react'
import Editor from './Editor'
import '../App.css'
import useLocalStorage from '../hooks/localstorage';

function App() {
  const [html, setHTML] = useLocalStorage('html',"");
  const [css, setCss] = useLocalStorage('css',"");
  const [js, setJs] = useLocalStorage('js',"");
  const [srcDoc,setSrcDoc]=useState('');

  useEffect(()=> {const timeout= setTimeout(() => {
    setSrcDoc(`<html><style>${css}</style><body>${html}</body><script>${js}</script></html>`)
  }, 750);

  return ()=> clearTimeout(timeout);
},[html,css,js]);


  return (
    <>
      <div className='pane top-pane'>
          <Editor language="xml" displayname="HTML" value={html} onChange={setHTML} />
          <Editor language="css" displayname="CSS" value={css} onChange={setCss}/>
          <Editor language="javascript" displayname="JS" value={js} onChange={setJs} />
      </div>
      <div className='pane'>
          <iframe 
          srcDoc={srcDoc}
          title='output' 
          sandbox='allow-scripts'
          width='100%'
          height="100%"
          ></iframe>
      </div>
    </>
  )
}

export default App
