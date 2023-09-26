import { useCookies } from "react-cookie";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/consts";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/user/userSlice";
import { cookies } from "../App";

type AxiosError = {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
};
const axiosRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
axiosRequest.interceptors.request.use(
  //! i couldn't fix the type issue here, so it is like this for now
  async (config: AxiosRequestConfig | any) => {
    const accessToken = cookies.get("token");
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        const dispatch = useAppDispatch();
        dispatch(setUser(null));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosRequest;
