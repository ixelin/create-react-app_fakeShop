import React from "react";
import * as yup from "yup";
import {
  Button,
  Modal,
  Fade,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Product } from "../../types/Product";
import { ProductCategory } from "../../enums/ProductCategory";
import { usePatchProductMutate } from "../../hooks/usePatchProductMutate";
import { ModalTitle } from "../../enums/ModalTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setProduct } from "../../features/product/productSlice";
import { usePostProductMutate } from "../../hooks/usePostProductMutate";

interface FormValues {
  title: string;
  description: string;
  image: string;
  category: ProductCategory;
  price: number;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().required("Image URL is required"),
  category: yup.mixed<ProductCategory>().required("Category is required"),
  price: yup
    .number()
    .typeError("Invalid price format")
    .required("Price is required"),
});

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

const BaseModal: React.FC<BaseModalProps> = ({ open, onClose, title }) => {
  const { mutate: patch } = usePatchProductMutate();
  const { mutate: create } = usePostProductMutate();
  const product: Product | null = useAppSelector(
    (state) => state.product.product
  );
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: product?.title,
      description: product?.description,
      image: product?.image,
      category: product?.category,
      price: product?.price,
    },
    resolver: yupResolver<FormValues>(schema),
  });

  const handleClose = () => {
    onClose();
    if (title === ModalTitle.create) {
      reset();
    }
    dispatch(setProduct(null));
  };

  const onSubmit = (data: FormValues) => {
    const updatedProduct: FormValues = {
      title: data.title,
      description: data.description,
      image: data.image,
      category: data.category,
      price: data.price,
    };
    if (title === ModalTitle.create) {
      create(updatedProduct);
    }
    if (title === ModalTitle.patch) {
      if (!product) {
        handleClose();
        return;
      }
      //? Rating always gets cleared, because the server returns us data without rating all the time, no matter the circumstances
      //   patch({
      //     productId: product.id,
      //     updatedProduct: { ...updatedProduct, rating: product.rating },
      //   });
      patch({
        productId: product.id,
        updatedProduct: updatedProduct,
      });
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open}>
        <div
          style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "4px",
          }}
        >
          <Typography variant="h6" id="modal-title">
            {title}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <div style={{ width: "50vw" }}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                  {errors.title && (
                    <Typography color="error">
                      {errors.title.message}
                    </Typography>
                  )}
                </div>
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <div style={{ width: "50vw" }}>
                  <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                  {errors.price && (
                    <Typography color="error">
                      {errors.price.message}
                    </Typography>
                  )}
                </div>
              )}
            />
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <div style={{ width: "50vw" }}>
                  <TextField
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                  {errors.image && (
                    <Typography color="error">
                      {errors.image.message}
                    </Typography>
                  )}
                </div>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div style={{ width: "50vw" }}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                  {errors.description && (
                    <Typography color="error">
                      {errors.description.message}
                    </Typography>
                  )}
                </div>
              )}
            />
            <div style={{ width: "50vw" }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="category-label"
                    label="Category"
                    variant="outlined"
                    fullWidth
                    {...field}
                  >
                    {Object.values(ProductCategory).map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.category && (
                <Typography color="error">{errors.category.message}</Typography>
              )}
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Save
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default BaseModal;
