import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder } from "../../Redux/Cart/action";
import { useParams } from "react-router-dom";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { CheckOutSteps2 } from "../../Components/Form/CheckOutSteps";
import "./Order.css";
import { Link } from "react-router-dom";

export const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order } = useSelector((state) => state.getOrderReducer);
  const { user } = useSelector((state) => state.authReducer);
  console.log(order);

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  return (
    <Box mt={4}>
      <Box textAlign="center" m="2rem">
        <Typography>
          Your order <strong>{order?.order?._id} </strong> is{" "}
          <strong>{order?.order?.orderStatus}</strong>
        </Typography>
      </Box>
      <CheckOutSteps2
        activeStep={order?.order?.orderStatus === "Processing" ? 1 : 3}
      />
      <Box mt="4rem" className="cartItems">
        <Box className="cartItems-box">
          <Stack
            maxWidth="80%"
            m="auto"
            p={2}
            spacing={2}
            boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
          >
            <Typography variant="h5">Order Shipping Information</Typography>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Full Name</Typography>
              <Typography>
                {user?.user?.firstName + " " + user?.user?.lastName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Mobile Number</Typography>
              <Typography>{order?.order?.shippingInfo?.phoneNo}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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

            <Typography variant="h5">Your Items</Typography>
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
                        <Typography
                          variant="h5"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {item?.name}
                        </Typography>
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
              {order?.order?.orderItems.length === 1 ? " item" : " items"})
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
          <Typography
            sx={{ fontSize: "1.4rem" }}
            className={`${
              order?.order?.orderStatus === "Delivered"
                ? "delivered"
                : "processing"
            }`}
          >
            Your Order is {order?.order?.orderStatus}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
