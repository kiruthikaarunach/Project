import React, { useState } from "react";
import CommentDataService from "../services/CommentService";
import AuthService from "../services/auth.service";
import { useParams, useNavigate } from 'react-router-dom';


//const AddComment = () => {
  const AddComment = props => {
    const { id }= useParams();
  const user = AuthService.getCurrentUser(); // Retrieve the current user
  const author = user ? user.username : "";
  const initialCommentState = {
    id: null,
    text: "",
    name: "",
    blogpost: id? id : "noid"
  };
  const [comment, setComment] = useState(initialCommentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const saveComment = () => {
    var data = {
      text: comment.text,
      name: comment.name,
      blogpost: comment.blogpost
    };

    const token = localStorage.getItem("token");
    // Replace 'YOUR_JWT_TOKEN' with the actual JWT token
    const headers = {
//      Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSZXlhbjIiLCJpYXQiOjE2OTgwMDMwNzMsImV4cCI6MTY5ODA4OTQ3M30.zu4sG0qNRisJ3akbgpJrtw4yP_PIcpSAEF5LSgMnbBs"
Authorization: token
   
};

    //CommentDataService.create(data, headers)
   CommentDataService.create(data)
      .then(response => {
        setComment({
          id: response.data.id,
          text: response.data.text,
          name: response.data.name,
          blogpost: response.data.blogpost
        });
        setSubmitted(true);
        console.log("cookie in add" + token);

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newComment = () => {
    setComment(initialCommentState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newComment}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              className="form-control"
              id="text"
              required
              value={comment.text}
              onChange={handleInputChange}
              name="text"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={comment.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="blogpost">BlogPost</label>
            <input
              type="text"
              className="form-control"
              id="blogpost"
              required
              value={comment.blogpost}
              onChange={handleInputChange}
              name="blogpost"
            />
          </div>

          <button onClick={saveComment} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddComment;
