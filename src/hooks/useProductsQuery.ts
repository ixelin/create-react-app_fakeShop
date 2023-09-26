import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";
import { BASE_URL } from "../utils/consts";
import axiosRequest from "../api/axios";
import { AxiosError } from "axios";

async function fetchData(): Promise<Product[]> {
  const response = await axiosRequest.get(`${BASE_URL}/products`);
  return response.data;
}

export const useProductsQuery = () => {
  return useQuery<Product[], AxiosError>(["products"], fetchData, {
    enabled: false,
  });
};
