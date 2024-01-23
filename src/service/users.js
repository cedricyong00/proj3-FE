// import * as usersAPI from "../api/users";
import { getToken } from "../util/security";

// export async function signUp(userData) {
//   // Delegate the network request code to the users-api.js API module
//   // which will ultimately return a JSON Web Token (JWT)
//   const token = await usersAPI.signUp(userData);
//   return token;
// }

// export async function getLoginDetails(email) {
//   // Delegate the network request code to the users-api.js API module
//   // which will ultimately return a JSON Web Token (JWT)
//   // console.log("getLoginDetails", email)
//   const loginDetails = await usersAPI.getLoginDetails(email);
//   return loginDetails;
// }

// export async function loginUser(userData) {
//   // Delegate the network request code to the users-api.js API module
//   // which will ultimately return a JSON Web Token (JWT)
//   const res = await usersAPI.loginUser(userData);
//   return res;
// }

export function getUser() {
  const token = getToken();
  //   return token ? JSON.parse(atob(token.split(".")[1])).payload.user : null;
  return token ? JSON.parse(atob(token.split(".")[1])).payload : null;
}

// export function logOut() {
//   localStorage.removeItem("token");
// }
