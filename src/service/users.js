import { getToken } from "../util/security";

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).payload : null;
}

export function logOut() {
  localStorage.removeItem("token");
}
