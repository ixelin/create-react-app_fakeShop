import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/consts";
import { User } from "../types/User";
import { useNavigate } from "react-router-dom";
import { cookies } from "../App";
import { getUserCredentials } from "../helpers/getUser";

async function login(loginData: Partial<User>): Promise<{ token: string }> {
  const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
  return response.data;
}
export const useLoginMutate = () => {
  const navigate = useNavigate();
  return useMutation(login, {
    onSuccess: async (data) => {
      cookies.set("token", data.token);
      getUserCredentials()
      navigate("/products");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      alert(error?.response?.data);
    },
  });
};
