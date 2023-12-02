import React, { useState,useContext, useEffect, useRef } from "react";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/xq-dark.css'
import 'codemirror/theme/the-matrix.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/3024-day.css'

import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'


import "../App.css"

import { Controlled as ControlledEditor } from "react-codemirror2";
import { SettingsContext } from "./App";


export default function Editor(props)
{

    const [open,setOpen]=useState(true);

    const { editor, setEditor, theme, setTheme, tabornot, setTabornot, autorun, setAutorun } = useContext(SettingsContext)
    
    const editorRef=useRef(0);

    const {
        language,
        displayname,
        value,
        onChange
    }=props;

    function handleChange(editor,data,value)
    {
        onChange(value);
    }

    //sets the min no of lines (useful for mobiles)
    useEffect(() => {
      let expectedLineCount=Math.min(Math.max(Math.floor(editorRef.current.editor.display.lastWrapHeight/24)-1,5),15);
      let lineCount = value.split(`\n`).length;
      if (lineCount < expectedLineCount) {
        let newValue = value;
        for (let i = lineCount; i < expectedLineCount; i++) {
          newValue += "\n";
        }
        onChange(newValue);
      }
    }, []);


    return (
        <div className={`editor-container ${open?'':'collapsed'}`}>
        <div className={`editor-title ${language}`}>
            <div>{displayname}</div>
            {!tabornot && editor!='markdown' && <button onClick={()=>setOpen(prevOpen=>!prevOpen)}>{open?"><":"<>"}</button> }
        </div>
        
        <ControlledEditor onBeforeChange={handleChange} value={value} className="code-mirror-wrapper" options={{
            lineWrapping:true,
            lint:true,
            lineNumbers:true,
            mode:language,
            theme:theme,
        }}
        ref={editorRef}
        />
    </div>
    );
};