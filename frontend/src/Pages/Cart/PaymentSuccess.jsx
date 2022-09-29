import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { BLUE_COLOR } from "../../Components/Colors/Colors";
import { Link } from "react-router-dom";

export const PaymentSuccess = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        textAlign="center"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <CheckCircleIcon sx={{ fontSize: "40px", color: `${BLUE_COLOR}` }} />
        <Typography variant="h4" m={2}>
          Your Order Has Been Successfully Placed
        </Typography>
        <Link to="/products">
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: `${BLUE_COLOR}` }}
          >
            Continue Shopping
          </Button>
        </Link>
        <Typography m={1}>Or</Typography>
        <Link to="/orders">
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: `${BLUE_COLOR}` }}
          >
            View Order
          </Button>
        </Link>
      </Box>
    </>
  );
};
