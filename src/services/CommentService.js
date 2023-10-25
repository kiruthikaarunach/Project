import http from "../http-common";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";



const create = data => {
  return axios.post(API_URL +"/comments", data);
};
const getAll = () => {
  return axios.get(API_URL +"/comments");
};

const get = name => {
//  return axios.get(API_URL +"/comments/${name}");
return axios.get(`${API_URL}/comments/${name}`);

};

// const create = data => {
//   return http.post("/comments", data);
// };

const update = (name, data) => {
  return axios.put(`${API_URL}/comments/${name}`, data);
};

const remove = name => {
  return axios.delete(`${API_URL}/comments/${name}`);
};

const removeAll = () => {
  return axios.delete(API_URL  + "/comments");
};

const findByName = name => {
  return axios.get(`${API_URL}/comments?name=${name}`);
};
// const findByTitle = blogpost => {
//   return http.get(`/comments?blogpost=${blogpost}`);
// };

const CommentService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default CommentService;
