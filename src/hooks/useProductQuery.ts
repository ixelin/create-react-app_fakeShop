import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../types/Product";
import { BASE_URL } from "../utils/consts";
import axiosRequest from "../api/axios";
import { AxiosError } from "axios";

async function fetchData(id: number): Promise<Product> {
  const response = await axiosRequest.get(`${BASE_URL}/products/${id}`);
  return response.data;
}

export const useProductQuery = (id: number) => {
  const queryClient = useQueryClient();
  return useQuery<Product, AxiosError>(["product", id], () => fetchData(id), {
    //? We can use initial data to optimize getting single product for better UX after all products have been fetched
    //? Fetch will happen in background, and only change initial data, so user sees loader less time
    initialData: () => {
      return queryClient
        .getQueryData<Product[]>(["products"])
        ?.find((product) => product.id === +id);
    },
    enabled: false,
  });
};
