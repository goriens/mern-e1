import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BLUE_COLOR, ORANGE_COLOR } from "../../Components/Colors/Colors";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_SUCCESS_SUCCESS } from "../../Redux/Auth/actionTypes";
import { clearError, loginUser } from "../../Redux/Auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MetaData } from "../../Components/Layout/MetaData";
import { useEffect } from "react";
const theme = createTheme();

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isAuth } = useSelector(
    (state) => state.authReducer
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      loginUser({
        email: data.get("email"),
        password: data.get("password"),
      })
    )
      .then((res) => {
        if (res === LOGIN_SUCCESS_SUCCESS) {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  isError &&
    toast.error(isError?.message, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  isAuth &&
    toast.success("Login Successfully", {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  useEffect(() => {
    if (isError) {
      dispatch(clearError());
    }
  }, [dispatch, isError]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="x">
        <CssBaseline />
        <MetaData title="Login" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "1rem",
            height: "90vh",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              helperText="Enter Your Email Address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText="Enter Your Password"
            />
            <Link to="/forgot/password">Forgot password?</Link>

            <Button
              type="submit"
              size="large"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: `${BLUE_COLOR}`,
                color: `${ORANGE_COLOR}`,
              }}
              variant="contained"
              disabled={isLoading || isAuth}
            >
              {isLoading && isAuth ? "Please Wait..." : "Log In"}
            </Button>
            <ToastContainer
              position="bottom-left"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Grid container justifyContent="flex-end">
              <Link to="/register">{"Don't have account? Register Here!"}</Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
