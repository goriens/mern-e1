import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BLUE_COLOR, ORANGE_COLOR } from "./../../Components/Colors/Colors";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "../../Redux/Auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MetaData } from "../../Components/Layout/MetaData";
import { REGISTER_SUCCESS_SUCCESS } from "../../Redux/Auth/actionTypes";
import { Avatar, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const theme = createTheme();

export const Register = () => {
  const { isLoading, isError, isAuth } = useSelector(
    (state) => state.authReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formUser, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formUser;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(registerUser(myForm)).then((r) => {
      if (r === REGISTER_SUCCESS_SUCCESS) {
        toast.success("Account Created Successfully", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    });
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...formUser, [e.target.name]: e.target.value });
    }
  };

  if (isAuth) {
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if (isError) {
      toast.error(isError?.message, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearError());
    }
  }, [dispatch, isError]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <MetaData title="Register" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: "4.5rem",
            mb: "5rem",
          }}
        >
          <Typography component="h1" variant="h4">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, mb: 3 }}
            maxWidth="700px"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="First Name"
                  required
                  name="firstName"
                  helperText="First name"
                  label="First Name"
                  value={firstName}
                  onChange={registerDataChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Last Name"
                  required
                  name="lastName"
                  helperText="Last name"
                  label="Last name"
                  value={lastName}
                  onChange={registerDataChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  helperText="Enter Your Email Id"
                  label="Email Id"
                  value={email}
                  onChange={registerDataChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  label="Password"
                  helperText="Enter Your Password (more than 8 characters)"
                  value={password}
                  onChange={registerDataChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                id="registerImage"
                display="flex"
                justifyContent="space-between"
              >
                <div>
                  <IconButton
                    sx={{ color: `${BLUE_COLOR}` }}
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      name="avatar"
                      onChange={registerDataChange}
                    />
                    <CloudUploadIcon />
                  </IconButton>
                  {avatarPreview ? "Uploaded" : "Upload Your Profile Picture"}
                </div>
                {avatarPreview && <Avatar alt="avatar" src={avatarPreview} />}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: `${BLUE_COLOR}`,
                color: `${ORANGE_COLOR}`,
              }}
              disabled={isLoading || formUser?.success}
            >
              {isLoading ? "Please Wait..." : "Register"}
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
              <Link to="/login">Already have an account? Login Here!</Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
