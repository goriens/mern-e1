import { Avatar, Box, Rating, Typography } from "@mui/material";
import React from "react";

export const ReviewCart = ({ comment, firstName, lastName, rating, user }) => {
  return (
    <>
      <Box
        p="1rem"
        className="product-cart"
        width="300px"
        m="10px"
        border="1px solid black"
      >
        <Box display="flex" justifyContent="space-between">
          <Avatar src={user?.avatar?.url} />
          <Box>
            <Typography fontWeight="bold">
              {firstName ? firstName + " " + lastName : "Unknown Person"}
            </Typography>
            <Rating name="read-only" value={rating} readOnly />
          </Box>
        </Box>
        <Typography variant="body2" p="10px">
          {comment}
        </Typography>
      </Box>
    </>
  );
};
