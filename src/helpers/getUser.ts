import jwtDecode from "jwt-decode";
import axiosRequest from "../api/axios";
import { BASE_URL } from "../utils/consts";
import { TDecoded } from "../types/TDecoded";
import { cookies } from '../App';
import { setUser } from "../features/user/userSlice";
import store from "../app/store";
//! this function handles user auth state
export async function getUserCredentials() {
  const token = cookies.get("token")
  if (token) {
    const id = jwtDecode<TDecoded>(token).sub;
    const response = await axiosRequest.get(`${BASE_URL}/users/${id}`);
    store.dispatch(setUser(response.data))
  } else {
    store.dispatch(setUser(null))
  }
}
