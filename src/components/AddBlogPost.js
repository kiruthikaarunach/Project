import React, { useState } from "react";
import BlogPostDataService from "../services/BlogPostService";
import AuthService from "../services/auth.service";


const AddBlogPost = () => {
  const user = AuthService.getCurrentUser(); // Retrieve the current user
  const author = user ? user.username : "";
  const initialBlogPostState = {
    id: null,
    title: "",
    description: "",
    content: "",
    author: author,
    published: false
  };
  const [blogpost, setBlogPost] = useState(initialBlogPostState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBlogPost({ ...blogpost, [name]: value });
  };

  const saveBlogPost = () => {
    var data = {
      title: blogpost.title,
      description: blogpost.description,
      content: blogpost.content,
      author: blogpost.author,
      published: blogpost.published
    };

    const token = localStorage.getItem("token");
    // Replace 'YOUR_JWT_TOKEN' with the actual JWT token
    const headers = {
//      Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSZXlhbjIiLCJpYXQiOjE2OTgwMDMwNzMsImV4cCI6MTY5ODA4OTQ3M30.zu4sG0qNRisJ3akbgpJrtw4yP_PIcpSAEF5LSgMnbBs"
Authorization: token
   
};

    //BlogPostDataService.create(data, headers)
   BlogPostDataService.create(data)
      .then(response => {
        setBlogPost({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          content: response.data.content,
          author: response.data.author,
          published: response.data.published
        });
        setSubmitted(true);
        console.log("cookie in add" + token);

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBlogPost = () => {
    setBlogPost(initialBlogPostState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBlogPost}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={blogpost.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={blogpost.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <input
              type="text"
              className="form-control"
              id="content"
              required
              value={blogpost.content}
              onChange={handleInputChange}
              name="content"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={blogpost.author}
              onChange={handleInputChange}
              name="author"
            />
          </div>

          <button onClick={saveBlogPost} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBlogPost;
