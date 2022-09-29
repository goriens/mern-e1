import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProducts } from "./../Redux/App/action";
import Carousel from "react-material-ui-carousel";
import { BLUE_COLOR, ORANGE_COLOR } from "../Components/Colors/Colors";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { ReviewCart } from "../Components/Cart/ReviewCart";
import "./Home/Home.css";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { MetaData } from "../Components/Layout/MetaData";
import { useState } from "react";
import { addItemsToCart } from "./../Redux/Cart/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReviewModel } from "../Components/ReviewModal";

export const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, isError, product } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(getSingleProducts(id));
  }, [dispatch, id]);

  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    if (product?.stock <= quantity) {
      return;
    }
    const count = quantity + 1;
    setQuantity(count);
  };
  const subQuantity = () => {
    if (1 >= quantity) {
      return;
    }
    const count = quantity - 1;
    setQuantity(count);
  };
  const addToCartHandle = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Product Add To Your Cart", {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MetaData title="Product Details" />
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

      {product && (
        <>
          <Box
            sx={{
              display: "flex",
              maxWidth: "80%",
              margin: "auto",
              boxSizing: "border-box",
              mt: "2rem",
            }}
            className="single-product-main-box"
          >
            <Box className="single-product-box" p="1rem" borderRadius="10px">
              <Carousel className="single-product-image-box">
                {product?.images?.map((item) => (
                  <img
                    key={item._id}
                    src={item.url}
                    alt={item.public_id}
                    className="single-product-image"
                  />
                ))}
              </Carousel>
            </Box>
            <Stack spacing={2} p="1rem" width="60%">
              <Typography variant="h4" textTransform={"capitalize"}>
                {product.name}
              </Typography>

              <Stack direction="row" spacing={2}>
                <Rating
                  name="read-only"
                  value={product.ratings ? product.ratings : 1}
                  readOnly
                />
                <Typography>({product.numOfReviews} Reviews)</Typography>
              </Stack>
              <ReviewModel
                handleClose={handleClose}
                handleOpen={handleOpen}
                open={open}
                dispatch={dispatch}
              />
              <Divider />

              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: `${product.stock === 0 ? "red" : "green"}`,
                }}
              >
                {product.stock ? "In Stock: " : "Out Of Stock: "}
                {product.stock} Item
              </Typography>
              <Typography>Description: {product.description}</Typography>
              <Divider />
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button
                  variant="contained"
                  className="btn-hover"
                  sx={{
                    backgroundColor: `${BLUE_COLOR}`,
                    color: `${ORANGE_COLOR}`,
                    width: "50px",
                  }}
                  size="small"
                  onClick={subQuantity}
                  disabled={1 === quantity}
                >
                  <RemoveIcon />
                </Button>
                <TextField
                  sx={{ width: "50px" }}
                  size="small"
                  value={quantity <= 9 ? "0" + quantity : quantity}
                />
                <Button
                  variant="contained"
                  className="btn-hover"
                  sx={{
                    backgroundColor: `${BLUE_COLOR}`,
                    color: `${ORANGE_COLOR}`,
                    width: "50px",
                  }}
                  size="small"
                  onClick={addQuantity}
                  disabled={product?.stock <= quantity}
                >
                  <AddIcon />
                </Button>
              </ButtonGroup>
              <Box display="flex">
                <Typography variant="h5" fontWeight="bold" m="0rem 1rem">
                  ₹ {product.price}
                </Typography>
                <Typography
                  sx={{ textDecoration: "line-through", color: "red" }}
                >
                  <em> ₹{product.price + 100}</em>
                </Typography>
                <Typography sx={{ color: "green" }} ml={2}>
                  <em>save ₹100</em>
                </Typography>
              </Box>
              <Divider />
              <Button
                sx={{
                  backgroundColor: `${BLUE_COLOR}`,
                  color: `${ORANGE_COLOR}`,
                }}
                fullWidth
                size="large"
                className="btn-hover"
                variant="contained"
                onClick={addToCartHandle}
                disabled={product.stock === 0}
              >
                ADD TO CART
              </Button>
            </Stack>
          </Box>
          <Box textAlign="center" m="2rem">
            <Typography variant="h4" m="5px">
              RATINGS & REVIEWS ({product?.numOfReviews})
            </Typography>
            <hr />
          </Box>

          <Box display="flex" width="90%" m="auto" overflow="auto">
            {product?.reviews && product?.reviews[0] ? (
              <Box m="auto">
                {product?.reviews.map((item) => (
                  <ReviewCart key={item._id} {...item} />
                ))}
              </Box>
            ) : (
              <Box textAlign="center" width="100%">
                <SentimentDissatisfiedIcon />
                <Typography>No Reviews</Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};
