import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { AdminSidebar } from "../../Components/Sidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductAdmin } from "./../../Redux/Admin/action";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AdminProducts = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, products } = useSelector(
    (state) => state.adminReducer
  );

  useEffect(() => {
    dispatch(getAllProductAdmin());
  }, [dispatch]);
  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 3,
      sortable: false,
    },
    { field: "name", headerName: "Name", minWidth: 150, flex: 3 },
    { field: "stock", headerName: "Stock", minWidth: 150, flex: 1 },

    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton>
              <DeleteIcon
                onClick={() =>
                  handleDeleteProduct(params.getValue(params.id, "id"))
                }
              />
            </IconButton>
          </>
        );
      },
    },
  ];
  const rows = [];
  products?.products &&
    products?.products?.forEach((item, i) => {
      rows.push({
        id: item._id,
        stock: item.stock === 1 ? item.stock + " Item" : item.stock + " Items",
        price: "₹ " + item.price,
        name: item.name,
      });
    });
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    toast.success("Delete Order Successfully", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(getAllProductAdmin());
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
        <Typography variant="h4">Products </Typography>

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

        {products?.products?.length > 0 && (
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
