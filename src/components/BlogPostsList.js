import React, { useState, useEffect } from "react";
import BlogPostDataService from "../services/BlogPostService";
import { Link } from "react-router-dom";

const BlogPostsList = () => {
  const [blogposts, setBlogPosts] = useState([]);
  const [currentBlogPost, setCurrentBlogPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveBlogPosts();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveBlogPosts = () => {
    BlogPostDataService.getAll()
      .then(response => {
        setBlogPosts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBlogPosts();
    setCurrentBlogPost(null);
    setCurrentIndex(-1);
  };

  const setActiveBlogPost = (blogpost, index) => {
    setCurrentBlogPost(blogpost);
    setCurrentIndex(index);
  };

  const removeAllBlogPosts = () => {
    BlogPostDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    BlogPostDataService.findByTitle(searchTitle)
      .then(response => {
        setBlogPosts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>BlogPosts List</h4>

        <ul className="list-group">
          {blogposts &&
            blogposts.map((blogpost, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBlogPost(blogpost, index)}
                key={index}
              >
                {blogpost.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBlogPosts}
        >
          Remove All
        </button>
        {/* <Link to={"/addcomment"} className="nav-link">
              Add
            </Link> */}
        
        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBlogPosts}
        >
          Add Comment
          
        </button> */}
      </div>
      <div className="col-md-6">
        {currentBlogPost ? (
          <div>
            <h4>BlogPost</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentBlogPost.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBlogPost.description}
            </div>
            <div>
              <label>
                <strong>Content:</strong>
              </label>{" "}
              {currentBlogPost.content}
            </div>
            <div>
              <label>
                <strong>Author:</strong>
              </label>{" "}
              {currentBlogPost.author}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBlogPost.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/blogposts/" + currentBlogPost.id}
              className="badge badge-warning"
            >
              Edit1
            </Link>
            <Link
              to={"/addcomment/"+ (currentBlogPost ? currentBlogPost.id : "")}
              className="badge badge-warning"
            >
              Add Comment
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a BlogPost...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostsList;
