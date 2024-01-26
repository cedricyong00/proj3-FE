/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import useFetch from "../hooks/useFetch";
import { getToken, removeToken } from "../util/security";

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).payload : null;
}

export function logOut() {
  localStorage.removeItem("token");
}