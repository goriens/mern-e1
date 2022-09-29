import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { CheckOutSteps } from "../../Components/Form/CheckOutSteps";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import "./Payment.css";
import { BLUE_COLOR } from "../../Components/Colors/Colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder } from "../../Redux/Cart/action";

export const Payment = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [payBtn, setPayBtn] = useState(false);
  const paymentData = {
    amount: cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.price * 100;
    }, 0),
  };
  const order = {
    shippingInfo,
    orderItems: cartItems,
    ItemsPrice: paymentData.amount,
    taxPrice: paymentData.amount - 500,
    shippingPrice: 0,
    totalPrice: paymentData.amount,
  };
  console.log("order", cartItems);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPayBtn(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/cart/payment",
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });
      if (result.error) {
        setPayBtn(false);
        toast.error(result.error.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          toast.success("Payment Success", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("./success");
        } else {
          toast.error("Something went Wrong, Please try later", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } catch (error) {
      setPayBtn(false);
      toast.error(error?.response?.data?.message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Box>
        <Box mt="3rem" mb="4rem" height="100vh">
          <CheckOutSteps activeStep={2} />

          <Stack
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            sx={{ mt: 8 }}
            maxWidth="400px"
            m="auto"
            spacing={3}
          >
            <Box
              display="flex"
              border="1px solid #001730"
              borderRadius="7px"
              p="9px"
              alignItems="center"
            >
              <CreditCardIcon />
              <CardNumberElement className="paymentInput" />
            </Box>
            <Box
              display="flex"
              border="1px solid #001730"
              borderRadius="7px"
              p="9px"
              alignItems="center"
            >
              <DateRangeIcon />
              <CardExpiryElement className="paymentInput" />
            </Box>
            <Box
              display="flex"
              border="1px solid #001730"
              borderRadius="7px"
              p="9px"
              alignItems="center"
            >
              <VpnKeyIcon />
              <CardCvcElement className="paymentInput" />
            </Box>
            <img
              src="https://www.pngmart.com/files/3/Major-Credit-Card-Logo-Transparent-Background.png"
              alt=""
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ backgroundColor: `${BLUE_COLOR}` }}
              disabled={payBtn}
            >
              {!payBtn ? `Pay ₹ ${paymentData.amount / 100}.00` : "Paying..."}
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
    </>
  );
};
