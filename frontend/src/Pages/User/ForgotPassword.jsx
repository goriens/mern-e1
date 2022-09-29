import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BLUE_COLOR, ORANGE_COLOR } from "../../Components/Colors/Colors";

export const ForgotPassword = () => {
  return (
    <Stack spacing={2} maxWidth="650px" m="auto" p={2}>
      <Typography variant="h3">Forgot Your Password</Typography>
      <Box>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            helperText="Enter Your Email Address"
          />
          <Link to="/login">Login Here!</Link>
          <Button
            type="submit"
            size="large"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: `${BLUE_COLOR}`,
              color: `${ORANGE_COLOR}`,
            }}
            variant="contained"
          >
            Send Email
            {/* {isLoading ? "Please Wait..." : "Log In"} */}
          </Button>

          <Grid container justifyContent="flex-end">
            <Link to="/register">{"Don't have account? Register Here!"}</Link>
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
};
