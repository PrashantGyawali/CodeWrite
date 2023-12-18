import NavComponent from './Navbar';
import Editor from './Editor';
import 'bootstrap/dist/css/bootstrap.css';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import '../App.css'
import useLocalStorage from '../hooks/localstorage';

//for syntax highlighting in markdown
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };





  function MarkdownOutput(props){
    return  (<div className='text-light '>
        <div className="editor-title css md-output-title">Output</div>
                <div className='pl-10'>
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={CodeBlock}>{props.markdown}</Markdown>
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
            


