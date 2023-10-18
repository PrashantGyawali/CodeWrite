import { useState, createContext} from 'react'
import WebEditor from './Webeditor';
import MarkdownEditor from './Mdeditor';
import '../App.css'

export const SettingsContext = createContext()

export default function App() {

    const [editor, setEditor] = useState("webeditor");
    const [theme, setTheme] = useState("material");
    const [tabornot, setTabornot] = useState(false);
    const [autorun, setAutorun] = useState(true);


  return (
    <>
    <SettingsContext.Provider value={{editor,setEditor,theme,setTheme,tabornot,setTabornot,autorun,setAutorun}}>
        {editor=='webeditor' && <WebEditor/>}
        {editor=='markdown' && <MarkdownEditor/>}
    </SettingsContext.Provider>
    </>
  )
}


