import http from "../http-common";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";



const create = data => {
  return axios.post(API_URL +"/blogposts", data);
};
const getAll = () => {
  return axios.get(API_URL +"/blogposts");
};

const get = title => {
//  return axios.get(API_URL +"/blogposts/${title}");
return axios.get(`${API_URL}/blogposts/${title}`);

};

// const create = data => {
//   return http.post("/blogposts", data);
// };

const update = (title, data) => {
  return axios.put(`${API_URL}/blogposts/${title}`, data);
};

const remove = title => {
  return axios.delete(`${API_URL}/blogposts/${title}`);
};

const removeAll = () => {
  return axios.delete(API_URL  + "/blogposts");
};

const findByTitle = title => {
  return axios.get(`${API_URL}/blogposts?title=${title}`);
};
// const findByTitle = title => {
//   return http.get(`/blogposts?title=${title}`);
// };

const BlogPostService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default BlogPostService;
