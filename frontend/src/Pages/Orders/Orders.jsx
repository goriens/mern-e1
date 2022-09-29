import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../Redux/Cart/action";
import { DataGrid } from "@mui/x-data-grid";
import { MetaData } from "../../Components/Layout/MetaData";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { BLUE_COLOR } from "./../../Components/Colors/Colors";

export const Orders = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, orders } = useSelector(
    (state) => state.getOrderReducer
  );
  const { user } = useSelector((state) => state.authReducer);
  console.log(orders.length);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 150,
      flex: 4,
      sortable: false,
    },
    { field: "date", headerName: "Date", minWidth: 150, flex: 3 },
    { field: "itemsQty", headerName: "Quantity", minWidth: 150, flex: 2 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 2,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "delivered"
          : "processing";
      },
    },
    { field: "amount", headerName: "Amount", minWidth: 150, flex: 2 },
    {
      field: "view",
      headerName: "View",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  orders?.forEach((item, i) => {
    rows.push({
      id: item._id,
      itemsQty:
        item.orderItems.length === 1
          ? item.orderItems.length + " Item"
          : item.orderItems.length + " Items",
      date: item.paidAt.substr(0, 10),
      status: item.orderStatus,
      amount: "₹ " + item.totalPrice / 100 + ".00",
    });
  });

  return (
    <Box height="100vh">
      {orders?.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          textAlign="center"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <RemoveShoppingCartIcon
            sx={{ fontSize: "40px", color: `${BLUE_COLOR}` }}
          />
          <Typography variant="h4">No Orders Found</Typography>
          <Link to="/products">
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: `${BLUE_COLOR}` }}
            >
              GO to Product
            </Button>
          </Link>
        </Box>
      )}
      <Typography variant="h3" m={4}>
        Your Orders
      </Typography>
      <MetaData title={`${user?.user?.firstName} - Orders`} />
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
      {orders?.length > 0 && (
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
  );
};
