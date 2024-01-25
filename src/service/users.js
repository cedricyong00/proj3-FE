/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import useFetch from "../hooks/useFetch";
import { getToken, removeToken } from "../util/security";

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).payload : null;
}

export async function logOut(token, userData) {
  const userInfo = getUser();
  const { sendRequest } = useFetch();
  const logoutURL = `${import.meta.env.VITE_API_URL}/logout`;
  if (token) {
    // send request
    const res = await sendRequest(
      logoutURL,
      "POST",
      userInfo.email
    );
    removeToken();
    console.log(userInfo.email)
    window.location.reload();
    return res;
  }
  return true;
}
