import NavComponent from './Navbar';
import Editor from './Editor';
import 'bootstrap/dist/css/bootstrap.css';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import '../App.css'
import useLocalStorage from '../hooks/localstorage';

function MarkdownOutput(props){
    return  (<div className='text-light '>
        <div className="editor-title css md-output-title">Output</div>
                <div className='pl-10'>
                <Markdown remarkPlugins={[remarkGfm]}>{props.markdown}</Markdown>
                </div>
            </div>)
}

export default function MarkdownEditor(){
    const[markdown,setMarkdown]  = useLocalStorage("markdown",`# Hello World`);

    return (
        <>
        <NavComponent/>
        <div className="d-sm-flex " >
            <div className="editor-container h-90vh">
            <Editor language="markdown" displayname="Markdown" value={markdown} onChange={setMarkdown} />
            </div>

            <div className="editor-container min-height-300px h-sm-90vh">
            <MarkdownOutput markdown={markdown}/>
            </div>
        </div>
        </>
    )  
}
            


