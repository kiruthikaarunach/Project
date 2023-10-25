import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import AddBlogPost from "./components/AddBlogPost";
import BlogPost from "./components/BlogPost";
import BlogPostsList from "./components/BlogPostsList";


import AddComment from "./components/AddComment";
import Comment from "./components/Comment";
import CommentsList from "./components/CommentsList";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Social Media
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
          
          {currentUser && (
           <li className="nav-item">
            <Link to={"/blogposts"} className="nav-link">
              BlogPosts
            </Link>
          </li> 
          )}
             
        {currentUser && (
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
            )}
       

        {currentUser && (
           <li className="nav-item">
            <Link to={"/comments"} className="nav-link">
              Comments
            </Link>
          </li> 
          )}
             
        {/* {currentUser && (
          <li className="nav-item">
            <Link to={"/addcomment"} className="nav-link">
              Add
            </Link>
          </li>
            )} */}
        </div>


        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          {/* <Route exact path={"/"} element={<Home />} /> */}
                    <Route path="/" element={<BlogPostsList/>} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/blogposts" element={<BlogPostsList/>} />
          <Route path="/add" element={<AddBlogPost/>} />
          <Route path="/blogposts/:id" element={<BlogPost/>} />
          <Route path="/comments" element={<CommentsList/>} />
          <Route path="/addcomment/:id" element={<AddComment/>} />
          <Route path="/comments/:id" element={<Comment/>} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
