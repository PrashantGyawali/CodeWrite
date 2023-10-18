import React, { useState } from "react";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/material.css'

import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'

import "../App.css"

import { Controlled as ControlledEditor } from "react-codemirror2";

export default function Editor(props)
{

    const [open,setOpen]=useState(true)

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

    return (
        <div className={`editor-container ${open?'':'collapsed'}`}>
        <div className={`editor-title ${language}`}>
            <div>{displayname}</div>
            <button onClick={()=>setOpen(prevOpen=>!prevOpen)}>{open?"><":"<>"}</button>
        </div>
        
        <ControlledEditor onBeforeChange={handleChange} value={value} className="code-mirror-wrapper" options={{
            lineWrapping:true,
            lint:true,
            lineNumbers:true,
            mode:language,
            theme:'material'
        }}/>
    </div>
    );
};