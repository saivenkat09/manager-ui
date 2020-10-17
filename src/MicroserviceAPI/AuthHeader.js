export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("userIdAndName"));

  //console.log(user.jwt);

  if (user && user.jwt) {
    return { Authorization: "Bearer " + user.jwt };
  } else {
    return {};
  }
}
