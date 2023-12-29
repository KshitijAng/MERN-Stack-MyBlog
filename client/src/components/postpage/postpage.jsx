import { useParams } from 'react-router-dom';
import './postpage.css';
import React, { useEffect, useState} from 'react';
import { format } from 'date-fns';
import {Link} from 'react-router-dom';

const PostPage = () => {
 const [postInfo,setPostInfo] = useState(null);

 const {id} = useParams();
 useEffect(() => {
   fetch(`http://localhost:4000/post/${id}`)
     .then(response => {
       response.json().then(postInfo => {
         setPostInfo(postInfo);
       });
     });
 });

 if (!postInfo) return '';


    return (
        <>
        <div className='post-page'>
          <div className='image'>
           <img src={`http://localhost:4000/${postInfo.cover}`} alt='img' />
        </div>
        <h1 className='title'>{postInfo.title}</h1>
        <h4 className='author'> By {postInfo.author}
       <span className='time'>
       <time>{format(new Date(postInfo.createdAt), "do MMM, yyyy")}</time>
       </span>
       </h4>
        <div  className= "edit-row">
          
          <button> 
          <Link to= {`/edit/${postInfo._id} `} className="button-link"> Edit post <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          </Link>
          </button>
         
        </div>
        <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
        </>
    )
}

export default PostPage;