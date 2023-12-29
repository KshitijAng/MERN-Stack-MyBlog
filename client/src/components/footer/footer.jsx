import './footer.css';
import {Link} from "react-router-dom";
import React from 'react';

const Footer= () => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Optional smooth scrolling animation
        });
      };
    return(
        <>
  <div className="footer section__padding">
      <div className="footer-links_logo">
        <h1 className='gradient__text'><Link to={'/'} onClick={scrollToTop}>MyBlog </Link></h1>
      </div>

    <div className="footer-copyright">
      <p>@2023 My Blog. All rights reserved.</p>
    </div>
  </div>
        </>
    )
}


export default Footer;