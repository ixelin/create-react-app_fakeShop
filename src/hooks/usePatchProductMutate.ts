import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../types/Product";
import { useAppDispatch } from "../app/hooks";
import { setProduct, updateProduct } from "../features/product/productSlice";
import { BASE_URL } from "../utils/consts";
import axiosRequest from "../api/axios";
import { AxiosError } from "axios";

const patchProduct = async ({
  productId,
  updatedProduct,
}: {
  productId: number;
  updatedProduct: Partial<Product>;
}): Promise<Product> => {
  const response = await axiosRequest.patch(
    `${BASE_URL}/products/${productId}`,
    updatedProduct
  );
  return response.data;
};
//! RATING IS GONE BECAUSE SERVER RESPONSE ALWAYS RETURNS US OBJECT WITHOUT RATING, EVEN IF WE PUT IT IN THE BODY
export const usePatchProductMutate = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  //! THIS IS MADE BECAUSE IN THE TASK WE HAVE TO USE TANSTACK QUERY HOOKS, SO IM WORKING WITH API RESPONSE RESULTS (IT RETURNS NEW UPDATED OBJECT)
  const mutation = useMutation(patchProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData<Product>(["product", data.id], data);
      queryClient.setQueryData<Product[]>(
        ["products"],
        (cachedProducts = []) => {
          if (data) {
            const productIndex = cachedProducts.findIndex(
              (product) => product.id === data.id
            );
            const updatedProducts = [...cachedProducts];
            updatedProducts[productIndex] = data;
            return updatedProducts;
          }
          dispatch(updateProduct(data));
          dispatch(setProduct(data));

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
