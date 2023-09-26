import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useProductQuery } from "../../hooks/useProductQuery";
import Refetch from "../../components/refetch";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setProduct } from "../../features/product/productSlice";
import BaseModal from "../../components/modal";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { ModalTitle } from "../../enums/ModalTitle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDeleteProductMutate } from "../../hooks/useDeleteProductMutate";
const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, isError, refetch } = useProductQuery(
    id ? +id : 1
  );
  const dispatch = useAppDispatch();
  data && dispatch(setProduct(data));
  const product = useAppSelector((state) => state.product.product);
  const { mutate } = useDeleteProductMutate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<"" | ModalTitle>("");
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlePatch = () => {
    if (product) {
      closeModal();
      setTitle(ModalTitle.patch);
      openModal();
    }
  };

  const handleDelete = () => {
    //?  because we have to use tanstack for delete request
    if (product && product.id > 20) {
      alert(
        "You cant delete customly created products with this, because delete request is sent to server. Press get requests on products page"
      );
      return;
    }
    if (
      product &&
      window.confirm("Are you sure you want to delete this item?")
    ) {
      navigate("/products");
      mutate(product.id);
    } else {
      return;
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Refetch refetch={refetch} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress size={80} />
        </Box>
      </Container>
    );
  }
  if (isError) {
    return (
      <Container>
        <Refetch refetch={refetch} />
        <Alert
          severity="error"
          variant="outlined"
          sx={{
            textAlign: "center",
            mt: 5,
            padding: "25px",
            fontSize: "1.7rem",
          }}
        >
          {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Refetch refetch={refetch} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="auto"
              image={product?.image}
              alt={product?.title}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "2rem" }}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontSize: "2.5rem" }}
            >
              {product?.title}
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              style={{ fontSize: "1.5rem", marginTop: "1rem" }}
            >
              Category: <Chip label={product?.category} color="primary" />
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              style={{ fontSize: "2rem", marginTop: "1rem" }}
            >
              Price: ${product?.price.toFixed(2)}
            </Typography>
            {product?.rating?.rate && (
              <Typography
                variant="h5"
                color="#e1e111"
                style={{ fontSize: "2rem", marginTop: "1rem" }}
              >
                Rated at: {product.rating.rate}
              </Typography>
            )}
            {product?.rating?.count && (
              <Typography
                variant="h5"
                color="#f11f11"
                style={{ fontSize: "1.6rem", marginTop: "0.5rem" }}
              >
                By {product.rating.count} users
              </Typography>
            )}
            <Typography
              variant="body1"
              paragraph
              style={{ fontSize: "1.25rem", marginTop: "1rem" }}
            >
              {product?.description}
            </Typography>
            <IconButton color="success" onClick={handlePatch}>
              <EditIcon sx={{ fontSize: "40px" }} />
            </IconButton>{" "}
            <IconButton color="error" onClick={handleDelete}>
              <DeleteOutlineIcon sx={{ fontSize: "40px" }} />
            </IconButton>{" "}
          </Paper>
        </Grid>
      </Grid>
      <BaseModal open={isModalOpen} onClose={closeModal} title={title} />
    </Container>
  );
};

export default ProductPage;
