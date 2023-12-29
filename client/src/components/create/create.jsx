import React, {useState} from 'react';
import './create.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const Create = () => {
const [title,setTitle] = useState('');
const [summary,setSummary] = useState('');
const [content,setContent] = useState('');
const [author,setAuthor] = useState('');
const [files,setFiles] = useState('');

const [redirect,setRedirect] = useState(false);



const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  };

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

async function create(ev) {
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('author',author);
    data.set('file',files[0]);

    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data, 
        credentials: 'include',
    });
    if (response.ok) {
        setRedirect(true);
    }
}

if (redirect) {
    return <Navigate to ={'/'} />
}

    return (
        <>
        <form className="form" onSubmit={create}>
        <div className="gpt3__header-content-a">
        <h1 className="gradient__text">
         Create New Post
        </h1>
        </div>
        <input  type="title" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)} />
        <input type="summary" placeholder={'Summary'} value={summary} onChange={ev => setSummary(ev.target.value)} />
        <input type="author" placeholder={"Author's name"} value={author} onChange={ev => setAuthor(ev.target.value)} />

        <label className="file-input-label">
          <span>Choose File</span>
          <input type="file" className="file-input" onChange={ev => setFiles(ev.target.files)} />
        </label>
        <div className="quill-container">
            <ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} formats={formats} />
        </div>
        <button>Create Post</button>
        </form>
        </>
    )


}

export default Create;