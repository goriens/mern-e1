import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminSidebar } from "../../Components/Sidebar/AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BLUE_COLOR } from "../../Components/Colors/Colors";
import {
  clearError,
  getSingleUser,
  updateUser,
} from "../../Redux/Admin/action";
import { UPDATE_USER_SUCCESS } from "../../Redux/Admin/actionTypes";

export const UpdateUserAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, isError, user } = useSelector(
    (state) => state.adminUserReducer
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateUser(id, myForm)).then((r) => {
      if (r === UPDATE_USER_SUCCESS) {
        toast.success("User Updated Successfully", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/admin/users", { replace: true });
      }
    });
  };

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getSingleUser(id));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setRole(user.role);
    }
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
  }, [dispatch, isError, id, user]);

  return (
    <Box p="3rem" display="grid" gridTemplateColumns="1fr 5fr">
      <Box
        p={2}
        boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        m="8px"
        borderRadius="8px"
      >
        <AdminSidebar />
      </Box>
      <Box
        p={2}
        boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        m="8px"
        borderRadius="8px"
      >
        <Typography m="1rem 0rem" variant="h4">
          User Details
        </Typography>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: "5rem",
            }}
          >
            <CircularProgress disableShrink />
          </Box>
        )}
        {isError && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: "5rem",
            }}
          >
            Something Went Wrong
          </Box>
        )}

        <Stack
          spacing={1.4}
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          maxWidth="550px"
          m="auto"
        >
          <TextField
            fullWidth
            label="First Name"
            variant="standard"
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="standard"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email ID"
            variant="standard"
            type="email"
            placeholder="Email ID"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Categories
            </InputLabel>
            <Select
              required
              value={role}
              name="category"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            size="large"
            sx={{ backgroundColor: `${BLUE_COLOR}` }}
            disabled={isLoading}
          >
            {isLoading ? "Product Updating..." : "Update User"}
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
