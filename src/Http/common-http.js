import axios from "axios";

const user = JSON.parse(localStorage.getItem("userIdAndName"));
export default axios.create({
  baseURL:
    "http://a25d7841408b245f481a7ddb568dd09f-1591248461.us-east-1.elb.amazonaws.com",
  withCredentials: true,
  headers: {
    Authorization: "Bearer " + user.jwt,
    "Content-type": "application/json",
  },
});
