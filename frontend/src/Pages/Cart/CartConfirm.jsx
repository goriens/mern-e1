import React from "react";
import { CheckOutSteps } from "../../Components/Form/CheckOutSteps";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BLUE_COLOR } from "../../Components/Colors/Colors";

export const CartConfirm = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { shippingInfo } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.authReducer);
  return (
    <>
      <Box mb="4rem" mt="3rem">
        <CheckOutSteps activeStep={1} />
        <>
          <Box mt="4rem" className="cartItems">
            <Box className="cartItems-box">
              <Stack
                maxWidth="80%"
                m="auto"
                p={2}
                spacing={2}
                boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
              >
                <Typography variant="h5">Shipping Information</Typography>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Full Name</Typography>
                  <Typography>
                    {user?.user?.firstName + " " + user?.user?.lastName}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Mobile Number</Typography>
                  <Typography>{shippingInfo.phoneNo}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Shipping Address</Typography>
                  <Typography mb="2rem">
                    {shippingInfo.address +
                      ", " +
                      shippingInfo.city +
                      ", " +
                      shippingInfo.country +
                      ", " +
                      shippingInfo.pinCode}
                  </Typography>
                </Box>

                <Typography variant="h5">Your Items</Typography>
                <Divider />
                <Box>
                  {cartItems.map((item) => (
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
                          src={item?.image?.url}
                          alt="url-mobile"
                        />
                        <Box>
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
              <Typography variant="h5">Price Information</Typography>
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Typography>
                  Price ({cartItems.length}
                  {cartItems.length === 1 ? " item" : " items"})
                </Typography>
                <Typography>
                  ₹{" "}
                  {cartItems.reduce((acc, item) => {
                    return acc + item.quantity * (item.price + 100);
                  }, 0)}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Discount</Typography>
                <Typography sx={{ color: "green" }}>
                  ₹ -{cartItems.length * 100}
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
                  ₹{" "}
                  {cartItems.reduce((acc, item) => {
                    return acc + item.quantity * item.price;
                  }, 0)}
                </Typography>
              </Box>
              <Link to="/cart/payment">
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: `${BLUE_COLOR}` }}
                >
                  Proceed To Payment
                </Button>
              </Link>
            </Stack>
          </Box>
        </>
      </Box>
    </>
  );
};
