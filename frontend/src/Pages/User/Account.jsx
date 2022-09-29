import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BLUE_COLOR } from "./../../Components/Colors/Colors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import UpdateIcon from "@mui/icons-material/UpdateDisabled";
import { userLogout } from "../../Redux/Auth/action";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { USER_LOGOUT_SUCCESS } from "../../Redux/Auth/actionTypes";

export const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer);
  function logoutUser() {
    dispatch(userLogout()).then((res) => {
      if (res === USER_LOGOUT_SUCCESS) {
        navigate("/login", { replace: true });
      }
    });
    toast.success("Logout Successfully", {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <Box width="90%" m="auto" p="1rem">
      <Typography variant="h2">My Account</Typography>

      <Box display="flex" justifyContent="space-around" mt={2}>
        <Box
          width="30%"
          p="2rem"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
          borderRadius="5px"
          textAlign="center"
        >
          <Box className="account-img">
            <Avatar
              alt={user?.user?.firstName}
              src={user?.user?.avatar?.url}
              sx={{ width: 170, height: 170 }}
            />
          </Box>

          <Stack spacing={1} mt={1}>
            <Typography variant="h4" textTransform="capitalize">
              Hi, {user?.user?.firstName}
            </Typography>

            <Link to="/orders">
              <Button
                variant="contained"
                sx={{ backgroundColor: `${BLUE_COLOR}`, color: "#fff" }}
                size="large"
                fullWidth
              >
                My Orders
              </Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={logoutUser}
            >
              Logout
            </Button>
          </Stack>
        </Box>
        <Stack
          spacing={1}
          width="40%"
          p="2rem"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
          borderRadius="5px"
        >
          <Box>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PersonIcon />
              <Typography variant="h6">Full Name</Typography>
            </Stack>
            <Typography>
              {user?.user?.firstName} {user?.user?.lastName}
            </Typography>
          </Box>
          <Box>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <EmailIcon />
              <Typography variant="h6">Email Address</Typography>
            </Stack>
            <Typography>{user?.user?.email}</Typography>
          </Box>
          <Box>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <JoinInnerIcon />
              <Typography variant="h6">Joined on</Typography>
            </Stack>
            <Typography>
              {user?.user?.createdAt.substr(0, 10)} (YYYY-MM-DD)
            </Typography>
          </Box>
          <Box>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <UpdateIcon />
              <Typography variant="h6">Last Update At on</Typography>
            </Stack>
            <Typography>
              {user?.user?.createdAt.substr(0, 10)} (YYYY-MM-DD)
            </Typography>
          </Box>
          <Link to="/me/update">
            <Button
              variant="contained"
              sx={{ backgroundColor: `${BLUE_COLOR}`, color: "#fff" }}
              size="large"
              fullWidth
            >
              Edit Profile
            </Button>
          </Link>
          <Button
            variant="contained"
            sx={{ backgroundColor: `${BLUE_COLOR}`, color: "#fff" }}
            size="large"
          >
            Change Password
          </Button>
        </Stack>
      </Box>
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
    </Box>
  );
};
