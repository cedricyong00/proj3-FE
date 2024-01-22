/* eslint-disable no-unused-vars */
import * as usersAPI from "../api/users";
import {getToken} from "../util/security";

export async function signUp(userData) {
    console.log("service", userData)
    const token = await usersAPI.signUp(userData);
}