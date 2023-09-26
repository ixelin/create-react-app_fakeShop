import jwtDecode from "jwt-decode";
import axiosRequest from "../api/axios";
import { BASE_URL } from "../utils/consts";
import { TDecoded } from "../types/TDecoded";
import { cookies } from '../App';
import { setUser } from "../features/user/userSlice";
import { AppDispatch } from "../app/store";
export async function getUserCredentials(dispatch:AppDispatch) {
  const token = cookies.get("token")
  if (token) {
    const id = jwtDecode<TDecoded>(token).sub;
    const response = await axiosRequest.get(`${BASE_URL}/users/${id}`);
    dispatch(setUser(response.data))
  } else {
    dispatch(setUser(null))
  }
}