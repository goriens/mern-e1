import { Box, Link, Stack, Typography } from "@mui/material";
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
          <Typography>
            <Link style={{ color: "red" }} href="#">
              About Us
            </Link>
          </Typography>
          <Typography>
            <Link style={{ color: "red" }} href="#">
              Contact Us
            </Link>
          </Typography>
          <Typography>
            <Link style={{ color: "red" }} href="#">
              Privacy Policy
            </Link>
          </Typography>
          <Typography>
            <Link style={{ color: "red" }} href="#">
              Terms & Conditions
            </Link>
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h2">GOUR SHOP</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h5">FOLLOW US</Typography>
          <Typography>
            <Link style={{ color: "red" }} href="https://github.com/goriens">
              Github
            </Link>
          </Typography>
          <Typography>
            <Link
              style={{ color: "red" }}
              href="https://www.linkedin.com/in/suhaib-gour/"
            >
              Linkedin
            </Link>
          </Typography>
          <Typography>
            <Link style={{ color: "red" }} href="#">
              Twitter
            </Link>
          </Typography>
        </Stack>
      </Box>
    </>
  );
};
