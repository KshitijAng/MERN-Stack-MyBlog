import './editpage.css';
import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';



export default function EditPost() {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [author,setAuthor] = useState('');
    const [files,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/'+id).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
        })
    },[id]);
    
    
    
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

async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('id',id);
    data.set('author',author);
    if (files?.[0]) {
    data.set('file',files?.[0]);
    }

  const response = await fetch('http://localhost:4000/post', {
        method: 'PUT',
        body: data,
        credentials: 'include',
    })
    if (response.ok){
    setRedirect(true);
    }
}



    if (redirect) {
        return <Navigate to ={'/post/'+id} />
    }
    
        return (
            <>
            <form className="form" onSubmit={updatePost}>
            <div className="gpt3__header-content-e">
            <h1 className="gradient__text">
             Edit Post
            </h1>
            </div>
            <input  type="title" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)} />
            <input type="summary" placeholder={'Summary'} value={summary} onChange={ev => setSummary(ev.target.value)} />
            <input type="author" placeholder={"Please enter author's name again"} value={author} onChange={ev => setAuthor(ev.target.value)} />
    
            <label className="file-input-label">
              <span>Choose File</span>
              <input type="file" className="file-input" onChange={ev => setFiles(ev.target.files)} />
            </label>
            <div className="quill-container">
                <ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} formats={formats} />
            </div>
            <button>Update Post</button>
            </form>
            </>
        )
    
    
    }
    