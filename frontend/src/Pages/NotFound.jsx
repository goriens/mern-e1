import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { BLUE_COLOR } from "../Components/Colors/Colors";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <Stack
        spacing={2}
        width="100%"
        textAlign="center"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <HelpOutlineIcon sx={{ fontSize: "40px", color: `${BLUE_COLOR}` }} />
        <Typography variant="h4">Page Not Found!</Typography>
        <Link to="/">
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: `${BLUE_COLOR}` }}
          >
            Go To Home Page
          </Button>
        </Link>
      </Stack>
      ;
    </>
  );
};
