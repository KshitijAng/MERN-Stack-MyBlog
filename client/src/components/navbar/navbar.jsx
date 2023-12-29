import React, { useState,useEffect, useContext } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import {Link} from "react-router-dom";
import {UserContext} from '../../UserContext';

const Menu = () => (
  <>
    <p>
      <a href="/">Home</a>
    </p>
    <p>
      <a href="/post">Posts</a>
    </p>
  </>
);

// BEM -> Block Element Modifier

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const {setUserInfo, userInfo = {} } = useContext(UserContext);


  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(userInfo => {
        setUserInfo(userInfo);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [setUserInfo]);



  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo({});
  }

  const username = userInfo.username;

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <p className="gradient__text"><Link to={'/'}>MyBlog</Link></p>
        </div>
        <div className="navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="navbar-sign">
        {username && (
          <>
            <p>
              <Link to={"/create"}>Create new post</Link>
            </p>
            <button ><Link to={'/'} onClick={logout}> Logout</Link> </button>
          </>
        )} {!username &&(
          <>
            <p>
              <Link to={"/login"}>Login</Link>
            </p>
            <button >
              <Link to={"/register"}>Register</Link>
            </button>
          </>
        )}
      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale up center">
            <div className="navbar-menu_container-links">
              <Menu />
              <div className="navbar-menu_container-links-sign">
                <p> Sign In </p>
                <button >Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
