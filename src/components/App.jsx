import { useState, createContext} from 'react'
import WebEditor from './Webeditor';
import MarkdownEditor from './Mdeditor';
import '../App.css'
import useLocalStorage from '../hooks/localstorage';

export const SettingsContext = createContext()

export default function App() {

    const [editor, setEditor] = useLocalStorage("editor","webeditor");
    const [theme, setTheme] = useLocalStorage("theme","material");
    const [tabornot, setTabornot] = useLocalStorage("tabornot",false);
    const [autorun, setAutorun] = useLocalStorage("autorun",true);


  return (
    <>
    <SettingsContext.Provider value={{editor,setEditor,theme,setTheme,tabornot,setTabornot,autorun,setAutorun}}>
        {editor=='webeditor' && <WebEditor/>}
        {editor=='markdown' && <MarkdownEditor/>}
    </SettingsContext.Provider>
    </>
  )
}


