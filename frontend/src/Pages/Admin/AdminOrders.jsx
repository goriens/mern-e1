import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React from "react";
import { AdminSidebar } from "../../Components/Sidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearError,
  deleteOrder,
  getAllOrders,
} from "../../Redux/Admin/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError } = useSelector(
    (state) => state.adminOrderReducer
  );
  console.log(orders.orders);

  useEffect(() => {
    dispatch(getAllOrders());
    if (isError) {
      toast.error(isError.message, {
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

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 150,
      flex: 3,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "delivered"
          : "processing";
      },
    },
    {
      field: "itemQuantity",
      headerName: "Items Quantity",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "totalPrice",
      headerName: "Total Price",
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
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton>
              <DeleteIcon
                onClick={() =>
                  handleDeleteOrders(params.getValue(params.id, "id"))
                }
              />
            </IconButton>
          </>
        );
      },
    },
  ];
  const rows = [];
  orders?.orders &&
    orders?.orders?.forEach((item, i) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemQuantity:
          item.orderItems.length === 1
            ? item.orderItems.length + " Item"
            : item.orderItems.length + " Items",
        totalPrice: `₹ ${item.totalPrice / 100}.00`,
      });
    });
  const handleDeleteOrders = (id) => {
    dispatch(deleteOrder(id));
    toast.success("Delete Order Successfully", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(getAllOrders());
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
          Orders ({orders?.orders?.length})
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

        {orders?.orders?.length > 0 && (
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
