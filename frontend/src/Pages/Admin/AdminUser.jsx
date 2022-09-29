import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AdminSidebar } from "../../Components/Sidebar/AdminSidebar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../Redux/Admin/action";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AdminUser = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, users } = useSelector(
    (state) => state.adminUserReducer
  );
  console.log("users", isLoading, isError, users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const columns = [
    {
      field: "id",
      headerName: "User Id",
      minWidth: 150,
      flex: 3,
      sortable: false,
    },
    { field: "email", headerName: "user Name", minWidth: 150, flex: 3 },
    { field: "name", headerName: "Email Id", minWidth: 150, flex: 1 },

    {
      field: "role",
      headerName: "User Role",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton>
              <DeleteIcon
                onClick={() =>
                  handleDeleteUser(params.getValue(params.id, "id"))
                }
              />
            </IconButton>
          </>
        );
      },
    },
  ];
  const rows = [];
  users?.users &&
    users?.users?.forEach((item, i) => {
      rows.push({
        id: item._id,
        name: item.firstName + " " + item.lastName,
        email: item.email,
        role: item.role,
      });
    });

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    toast.success("Delete User Successfully", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(getAllUsers());
  };
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
          All Users
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

        {users?.users?.length > 0 && (
          <Box width="1200px" m="auto">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={6}
              disableSelectionOnClick
              autoHeight
            />
          </Box>
        )}
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
