import { Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import "./ProductCart.css";
import { ORANGE_COLOR } from "./../Colors/Colors";

export const ProductCart = ({
  name,
  category,
  ratings,
  numOfReviews,
  price,
  images,
}) => {
  return (
    <>
      <Box
        p="1rem"
        className="product-cart"
        maxWidth="100%"
        textAlign="center"
        m="auto"
        minHeight="400px"
      >
        <Box width="90%" m="auto" height="300px">
          <img
            src={images[0]?.url}
            alt="product-img"
            className="products-box-images"
          />
        </Box>
        <Stack spacing="6px">
          <Typography
            variant="h5"
            lineHeight="1.5"
            height="3em"
            overflow="hidden"
          >
            {name}
          </Typography>
          <Typography variant="caption">{category}</Typography>
          <Box display={"flex"} justifyContent="space-between">
            <Rating name="read-only" value={ratings} readOnly />
            <Typography>Reviews ({numOfReviews})</Typography>
          </Box>
          <Typography
            sx={{
              color: `${ORANGE_COLOR}`,
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            ₹ {price} /-
          </Typography>
        </Stack>
      </Box>
    </>
  );
};
