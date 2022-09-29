import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { BLUE_COLOR, ORANGE_COLOR } from "./../Colors/Colors";

export const Footer = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-around"
        p="3rem"
        backgroundColor={`${BLUE_COLOR}`}
        color={`${ORANGE_COLOR}`}
      >
        <Stack spacing={1}>
          <Typography variant="h5">USEFUL LINKS</Typography>
          <Typography>About Us</Typography>
          <Typography>Contact Us</Typography>
          <Typography>Privacy Policy</Typography>
          <Typography>Terms & Conditions</Typography>
        </Stack>
        <Stack>
          <Typography variant="h2">GOUR SHOP</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h5">FOLLOW US</Typography>
          <Typography>Twitter</Typography>
          <Typography>Linkedin</Typography>
          <Typography>Instagram</Typography>
        </Stack>
      </Box>
    </>
  );
};
