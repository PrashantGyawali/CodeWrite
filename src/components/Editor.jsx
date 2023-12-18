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

import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/display/autorefresh'
import 'codemirror/addon/edit/matchbrackets'

import "../App.css"
import Downloadbtn from "./Downloadbtn";
import minimize from "../assets/minimize.svg";
import maximize from "../assets/maximize.svg";

import { Controlled as ControlledEditor } from "react-codemirror2";
import { SettingsContext } from "./App";
import { sanitizeHTML } from "../utils/functions.js";
import DownloadAll from "./DownloadAll.jsx";

export default function Editor(props)
{

    const {editor,theme,tabornot,autoCloseTags} = useContext(SettingsContext)
    
    const editorRef=useRef(0);

    const {
        language,
        displayname,
        value,
        onChange,
        minimized,
        handleMinimize,
        handleDownloadAllClick
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

    const contentTypes={
      "xml":{type:"text/xml",name:"index.html"},
      "css":{type:"text/css", name:"style.css"},
      "javascript":{type:"text/javascript",name:"script.js"},
      "markdown":{type:"text/markdown",name:"markdown.md"}
    }
    const download=()=>{
      const link = document.createElement('a');
      let downloadableValue=value;
      if(language==="xml"){
        downloadableValue=sanitizeHTML(value);
      } 
      const content=new Blob([downloadableValue],{type:`${contentTypes[language].type};charset=utf-8`});
      link.href=URL.createObjectURL(content);
      link.download=contentTypes[language].name;
      link.click();
      URL.revokeObjectURL(link.href);
    }

    return (
        <div className={`editor-container ${minimized?"collapsed":''}`}>
        <div className={`editor-title ${language}`}>
            <div>{displayname}</div>
            <div style={{display:'flex',flexDirection:"row", marginLeft:"5px"}}>  
              {language=="xml" && <DownloadAll onClickfn={handleDownloadAllClick} title={"Combine into Single HTML"}/>  }
              <Downloadbtn onClickfn={download} title={"Download "+contentTypes[language].name}/> 
              {!tabornot && editor!='markdown' && <button onClick={handleMinimize}><img src={minimized?maximize:minimize} alt={!minimized?"><":"<>"} /> </button> }
            </div>
            
        </div>
        
        <ControlledEditor onBeforeChange={handleChange} value={value} className="code-mirror-wrapper" options={{
            lineWrapping:true,
            lint:true,
            inputStyle:"textarea",
            lineNumbers:true,
            mode:language,
            theme:theme,
            autoCloseBrackets: autoCloseTags,
            autoCloseTags: autoCloseTags,
            matchBrackets: true,
        }}
        ref={editorRef}
        />
    </div>
    );
};