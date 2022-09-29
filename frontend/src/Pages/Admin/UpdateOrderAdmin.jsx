import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminSidebar } from "../../Components/Sidebar/AdminSidebar";
import { updateOrder } from "../../Redux/Admin/action";
import { getSingleOrder } from "../../Redux/Cart/action";
import { BLUE_COLOR } from "./../../Components/Colors/Colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_ORDER_SUCCESS } from "../../Redux/Admin/actionTypes";

export const UpdateOrderAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const { order, isLoading } = useSelector((state) => state.getOrderReducer);
  console.log("single-order", order.order);
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  const statusHandleChange = (event) => {
    setStatus(event.target.value);
  };
  const orderStatusForm = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm)).then((r) => {
      if (r === UPDATE_ORDER_SUCCESS) {
        toast.success("Order Delivered Successfully", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/admin/orders");
      }
    });
  };

  return (
    <>
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
          <Typography variant="h4">Order Details & Status</Typography>
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
          <Box mt={4}>
            <Box mt="4rem" className="cartItems">
              <Box className="cartItems-box">
                <Stack
                  maxWidth="80%"
                  m="auto"
                  p={2}
                  spacing={2}
                  boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
                >
                  <Typography variant="h5">
                    Order Shipping Information
                  </Typography>
                  <Divider />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Full Name</Typography>
                    <Typography>
                      {user?.user?.firstName + " " + user?.user?.lastName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Mobile Number</Typography>
                    <Typography>
                      {order?.order?.shippingInfo?.phoneNo}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Shipping Address</Typography>
                    <Typography mb="2rem">
                      {order?.order?.shippingInfo.address +
                        ", " +
                        order?.order?.shippingInfo.city +
                        ", " +
                        order?.order?.shippingInfo.country +
                        ", " +
                        order?.order?.shippingInfo.pinCode}
                    </Typography>
                  </Box>

                  <Typography variant="h5">Costumer Items</Typography>
                  <Divider />
                  <Box>
                    {order?.order?.orderItems?.map((item) => (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        m="auto"
                        p={2}
                        key={item.product}
                        alignItems="center"
                        boxShadow="rgba(17, 17, 26, 0.1) 0px 1px 0px"
                        fullWidth
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          width="450px"
                          alignItems="center"
                        >
                          <img
                            width="80px"
                            src={item?.product?.images[0]?.url}
                            alt="url-mobile"
                          />
                          <Box>
                            <Link to={`/product/${item?.product}`}>
                              <Link to={`/product/${item?.product}`}>
                                <Typography
                                  variant="h5"
                                  sx={{ textTransform: "capitalize" }}
                                  lineHeight="1.5"
                                  height="3em"
                                  overflow="hidden"
                                >
                                  {item?.name}
                                </Typography>
                              </Link>
                            </Link>

                            <Typography>₹ {item?.price}</Typography>
                          </Box>
                        </Stack>
                        <Box width="200px" display="flex">
                          <Typography>
                            {item.quantity} x ₹{" " + item.price} = ₹
                            {" " + item.price * item.quantity}.00
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Stack>
              </Box>

              <Stack
                spacing={1.5}
                className="price-details"
                p="1.4rem"
                mt="2rem"
                mb="2rem"
              >
                <Typography variant="h5">Order Price</Typography>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography>
                    Price ({order?.order?.orderItems?.length}
                    {order?.order?.orderItems.length === 1 ? " item" : " items"}
                    )
                  </Typography>
                  <Typography>₹ {order?.order?.ItemsPrice / 100}.00</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Discount</Typography>
                  <Typography sx={{ color: "green" }}>
                    ₹ -{order?.order?.orderItems?.length * 100}.00
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Delivery Charges</Typography>
                  <Typography sx={{ color: "green" }}>Free</Typography>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontWeight: 600, fontSize: "19px" }}>
                    Total Amount
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: "19px" }}>
                    ₹ {order?.order?.ItemsPrice / 100}.00
                  </Typography>
                </Box>
                <Divider />

                <Typography variant="h5">Order Status</Typography>
                <Chip
                  sx={{ fontWeight: "bold" }}
                  label={`${order?.order?.orderStatus}`}
                />

                <form onSubmit={orderStatusForm}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Choose Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Choose Status"
                      onChange={statusHandleChange}
                      name="status"
                    >
                      <MenuItem value={""}>Status</MenuItem>
                      <MenuItem value={"Delivered"}>Delivered</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    fullWidth
                    sx={{ backgroundColor: `${BLUE_COLOR}`, m: "1rem 0rem" }}
                    variant="contained"
                    type="submit"
                    disabled={
                      order?.order?.orderStatus === "Delivered" || isLoading
                    }
                  >
                    {order?.order?.orderStatus === "Delivered"
                      ? "Delivered"
                      : "Change Status"}
                  </Button>
                </form>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
