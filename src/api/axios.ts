import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/consts";
import { cookies } from "../App";

const axiosRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
axiosRequest.interceptors.request.use(
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
