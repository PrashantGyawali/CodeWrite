import NavComponent from './Navbar';
import Editor from './Editor';
import 'bootstrap/dist/css/bootstrap.css';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import '../App.css'
import useLocalStorage from '../hooks/localstorage';

function MarkdownOutput(props){
    return  (<div className='text-light'>
        <div className="editor-title css">Output</div>
                <Markdown remarkPlugins={[remarkGfm]}>{props.markdown}</Markdown>
            </div>)
}

export default function MarkdownEditor(){
    const[markdown,setMarkdown]  = useLocalStorage("markdown",`# Hello World`);

    return (
        <>
        <NavComponent/>
        <div className="d-sm-flex overflow-y-md-scroll" >

            <div className="editor-container h-90vh">
            <Editor language="markdown" displayname="Markdown" value={markdown} onChange={setMarkdown} />
            </div>

            <div className="editor-container min-height-300px">
            <MarkdownOutput markdown={markdown}/>
            </div>
        </div>
        </>
    )  
}
            


