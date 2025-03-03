import axios from "axios";
//create that must return a promise
const BASE_URL = "http://blogsite-y4ve.onrender.com/api/v1/comments";

//!Create comment api
export const createCommentAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/create`, data, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return response.data;
};