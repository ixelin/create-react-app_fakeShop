import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../types/Product";
import { useAppDispatch } from "../app/hooks";
import { createProduct } from "../features/product/productSlice";
import { BASE_URL } from "../utils/consts";
import axiosRequest from "../api/axios";
import { AxiosError } from "axios";

async function postProduct(newProduct: Partial<Product>): Promise<Product> {
  const response = await axiosRequest.post(
    `${BASE_URL}/products`,
    newProduct
  );
  return response.data;
}

export const usePostProductMutate = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const mutation = useMutation(postProduct, {
    onSuccess: (data) => {
      //? Typically, with normal API, you do invalidate on mutations
      //   queryClient.invalidateQueries(["products"]);
      queryClient.setQueryData<Product[]>(
        ["products"],
        (cachedProducts = []) => {
          console.log(cachedProducts);

          return [
            ...cachedProducts,
            { ...data, id: cachedProducts[cachedProducts.length - 1].id + 1 },
          ];
        }
      );
      dispatch(createProduct(data));
    },
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });

  return mutation;
};
