// eslint-disable-next-line


import { format } from 'date-fns';
import '../posts/posts.css';
import React from 'react';
import {Link} from 'react-router-dom';


function Post({_id,title,summary,cover,content,createdAt,author}) {
    return(
      <>
        <div className="post">
         <div className="image">
          <Link to={`/post/${_id}`}>
        <img src={'http://localhost:4000/'+ cover} alt="img" />
        </Link>
        </div>
        <div className="text">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <p className="author">{author}</p>
          <time>{format(new Date(createdAt),"do MMM, yyyy")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
      </div>
      </>
    )
}

export default Post;