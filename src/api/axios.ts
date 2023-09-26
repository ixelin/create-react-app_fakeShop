import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/consts";
import { cookies } from "../App";

//? Axios instance is created, in order to put token in Authorization header, which will be sent with every request to the server
const axiosRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
axiosRequest.interceptors.request.use(
  //? there is bug related to axios config type, which i could not fix
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
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default axiosRequest;
