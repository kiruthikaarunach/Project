import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import BlogPostDataService from "../services/BlogPostService";

const BlogPost = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialBlogPostState = {
    id: null,
    title: "",
    description: "",
    content: "",
    author: "",
    published: false
  };
  const [currentBlogPost, setCurrentBlogPost] = useState(initialBlogPostState);
  const [message, setMessage] = useState("");

  const getBlogPost = title => {
    BlogPostDataService.get(title)
      .then(response => {
        setCurrentBlogPost(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getBlogPost(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBlogPost({ ...currentBlogPost, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentBlogPost.id,
      title: currentBlogPost.title,
      description: currentBlogPost.description,
      content: currentBlogPost.content,
      author: currentBlogPost.author,
      published: status
    };

    BlogPostDataService.update(currentBlogPost.title, data)
      .then(response => {
        setCurrentBlogPost({ ...currentBlogPost, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBlogPost = () => {
    BlogPostDataService.update(currentBlogPost.title, currentBlogPost)
      .then(response => {
        console.log(response.data);
        setMessage("The blogpost was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBlogPost = () => {
    BlogPostDataService.remove(currentBlogPost.title)
      .then(response => {
        console.log(response.data);
        navigate("/blogposts");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBlogPost ? (
        <div className="edit-form">
          <h4>BlogPost</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBlogPost.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBlogPost.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <input
                type="text"
                className="form-control"
                id="content"
                name="content"
                value={currentBlogPost.content}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={currentBlogPost.author}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBlogPost.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBlogPost.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBlogPost}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBlogPost}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a BlogPost...</p>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
