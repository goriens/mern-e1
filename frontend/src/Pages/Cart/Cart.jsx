import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BLUE_COLOR } from "./../../Components/Colors/Colors";
import { addItemsToCart, removeItemCart } from "./../../Redux/Cart/action";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { isAuth } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemCart(id));
  };

  return (
    <>
      {cartItems?.length === 0 && (
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
          <Typography variant="h4">No Product on Your Cart</Typography>
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
      {cartItems.length > 0 && (
        <>
          <Typography variant="h4" ml="2rem" mt="2rem">
            Your Bag
          </Typography>
          <Box mt="4rem" className="cartItems">
            <Box className="cartItems-box">
              {cartItems.map((item) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  maxWidth="80%"
                  m="auto"
                  p={2}
                  key={item.product}
                  alignItems="center"
                  boxShadow="rgba(17, 17, 26, 0.1) 0px 1px 0px"
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    width="450px"
                    sx={{ objectFit: "scale-down" }}
                  >
                    <img
                      width="100px"
                      src={item?.image?.url}
                      alt="url-mobile"
                      className="object-scale-down"
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
                      <Typography
                        variant="caption"
                        sx={{ color: `${item?.stock === 0 ? "red" : "green"}` }}
                      >
                        {item?.stock === 0 ? "Out Of Stock" : "In Stock"}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Typography
                          sx={{
                            color: "#ff5959",
                            textDecorationLine: "line-through",
                          }}
                        >
                          <em> ₹{item?.price + 100}</em>
                        </Typography>
                        <Typography>₹ {item?.price}</Typography>
                      </Stack>
                      <Button
                        size="small"
                        sx={{ color: "red" }}
                        onClick={() => deleteCartItems(item.product)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Stack>
                  <Box width="200px" display="flex">
                    <ButtonGroup>
                      <Button
                        size="small"
                        onClick={() => decreaseQty(item.product, item.quantity)}
                        disabled={1 === item.quantity}
                      >
                        -
                      </Button>
                      <TextField
                        size="small"
                        sx={{ width: "50px" }}
                        value={
                          item.quantity <= 9
                            ? "0" + item.quantity
                            : item.quantity
                        }
                        readOnly
                      />
                      <Button
                        size="small"
                        onClick={() =>
                          increaseQty(item.product, item.quantity, item.stock)
                        }
                        disabled={item?.stock <= item.quantity}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </Box>
                  <Box width="150px">
                    <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                      ₹ {item.price * item.quantity}.00
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Stack
              spacing={1.5}
              className="price-details"
              p="1.4rem"
              mt="2rem"
              mb="2rem"
            >
              <Typography variant="h5">Price Details</Typography>
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
              <Link to={`${isAuth ? "/shipping" : "/login"}`}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: `${BLUE_COLOR}` }}
                >
                  Place Order
                </Button>
              </Link>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
};
