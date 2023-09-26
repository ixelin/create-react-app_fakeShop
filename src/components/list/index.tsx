import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProductsQuery } from "../../hooks/useProductsQuery";
import Refetch from "../refetch";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setProducts } from "../../features/product/productSlice";
import { useQueryClient } from "@tanstack/react-query";
const ProductList = () => {
  const navigate = useNavigate();
  const { data, error, isLoading, isError, refetch } = useProductsQuery();
  const dispatch = useAppDispatch()
  //! tanstack query is used for fetching products here
  //? i made it on click, in order for app to differentiate between cached and server data, to apply changes to the cache, as per task
  data && dispatch(setProducts(data))
  const products = useAppSelector((state) => state.product.products);
  const queryClient = useQueryClient()
  const handleRemoveFromCache = () => {
    queryClient.removeQueries(['products'])
    dispatch(setProducts([]))
  };
  if (isLoading) {
    return (
      <Container>
        <Refetch refetch={refetch} clear={handleRemoveFromCache} />
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
        <Refetch refetch={refetch} clear={handleRemoveFromCache} />
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
    <Container>
      <Refetch refetch={refetch} clear={handleRemoveFromCache} />
      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <CardMedia
                component="img"
                height="150"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.title.slice(0, 20) + "..."}
                </Typography>
                <Typography color="textSecondary">
                  {product.description.slice(0, 30) + "..."}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${Number(product.price).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Category: {product.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
