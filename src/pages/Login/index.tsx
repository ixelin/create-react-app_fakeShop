import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutate } from "../../hooks/useLoginMutate";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../../utils/consts";
import { User } from "../../types/User";

interface LoginForm {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });
  const { mutate } = useLoginMutate();
  const onSubmit = (data: LoginForm) => {
    mutate(data);
  };
  //! this function makes it easier to check login functionality
  async function handleGetUsers() {
    try {
      const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}/users`);
      const data: User[] = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const user = useAppSelector((state) => state.user.user);
  //? after login, user is sent back
  if (user) {
    return <Navigate to="/products" />;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        background: "#450726",
        paddingBottom: "2rem",
        borderRadius: "40px",
      }}
    >
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "2rem", padding: "1rem" }}>
          Log In
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    autoComplete="username"
                    sx={{ background: "white" }}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    sx={{ background: "white" }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2, background: "white", color: "black" }}
          >
            Sign in
          </Button>
          <Button
            fullWidth
            sx={{ mt: 3, mb: 2, background: "green", color: "white" }}
            onClick={handleGetUsers}
          >
            Get All Users in Console
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
