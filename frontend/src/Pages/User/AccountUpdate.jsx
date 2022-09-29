import React, { useEffect } from "react";
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
import { useState } from "react";
import { clearError, updateAccount } from "../../Redux/Auth/action";
import { getProfile } from "./../../Redux/Auth/action";
import { UPDATED_PROFILE_SUCCESS } from "../../Redux/Auth/actionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();
export const AccountUpdate = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { isLoading, isError } = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  useEffect(() => {
    if (user) {
      setFirstName(user?.user?.firstName);
      setLastName(user?.user?.lastName);
    }
    if (isError?.success === false) {
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
  }, [user, isError, dispatch]);

  const updateHandler = () => {
    dispatch(
      updateAccount({
        firstName: firstName,
        lastName: lastName,
      })
    ).then((r) => {
      if (r === UPDATED_PROFILE_SUCCESS) {
        dispatch(getProfile());
        toast.success("Updated Successfully", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/account", { replace: true });
        }, 2000);
      }
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            mb={5}
          >
            <Typography component="h1" variant="h4">
              Update Your Profile
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: `${BLUE_COLOR}`,
                  color: `${ORANGE_COLOR}`,
                }}
                disabled={isLoading}
                onClick={() => {
                  updateHandler();
                }}
              >
                {isLoading ? "Please Wait..." : "Update"}
              </Button>

              <Grid container justifyContent="flex-end">
                <Link to="/login">Already have an account? Login Here!</Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
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
    </>
  );
};
