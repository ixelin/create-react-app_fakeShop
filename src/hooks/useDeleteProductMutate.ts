import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../types/Product";
import { useAppDispatch } from "../app/hooks";
import { deleteProduct, setProduct } from "../features/product/productSlice";
import { BASE_URL } from "../utils/consts";
import axiosRequest from "../api/axios";
import { AxiosError } from "axios";

const deleteRequest = async (productId: number): Promise<Product> => {
  const response = await axiosRequest.delete(
    `${BASE_URL}/products/${productId}`
  );
  return response.data;
};
export const useDeleteProductMutate = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  //! DELETE WORKS ONLY ON PRODUCTS FROM API (id <= 20)
  //! THIS IS MADE BECAUSE IN THE TASK WE HAVE TO USE TANSTACK QUERY HOOKS, SO IM WORKING WITH API RESPONSE RESULTS (IT RETURNS DELETED OBJECT ONLY FROM ITS OWN DATA SAMPLE)
  //! IF YOU WANT TO DELETE ALL PRODUCTS THAT WERE CUSTOMLY CREATED, CLICK ON REQUEST DATA FROM API (THEY DO NOT EXIST IN API, SO ARE OVERWRITTEN)
  const mutation = useMutation(deleteRequest, {
    //? Typically, with normal API, you do this on mutations
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["products"]);
    //   queryClient.invalidateQueries(["product", productId]);
    // },
    onSuccess: (data) => {
      queryClient.removeQueries(["product", data.id]);
      queryClient.setQueryData<Product[]>(
        ["products"],
        (cachedProducts = []) => {
          if (data) {
            const productIndex = cachedProducts.findIndex(
              (product) => product.id === data.id
            );
            if (productIndex !== -1) {
              const updatedProducts = [...cachedProducts];
              updatedProducts.splice(productIndex, 1);
              dispatch(deleteProduct(data.id));
              return updatedProducts;
            }
            return cachedProducts;
          }
          dispatch(setProduct(null));

          return cachedProducts;
        }
      );
    },
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });

  return mutation;
};
