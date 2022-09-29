import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaidIcon from "@mui/icons-material/Paid";

const steps = [
  {
    label: <Typography>Address</Typography>,
    icon: <HomeIcon />,
  },
  {
    label: <Typography>Confirm Order</Typography>,
    icon: <LocalShippingIcon />,
  },
  {
    label: <Typography>Payment</Typography>,
    icon: <PaidIcon />,
  },
];

export const CheckOutSteps = ({ activeStep }) => {
  return (
    <Box sx={{ width: "100%" }} mb="1rem">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((item, i) => (
          <Step
            key={i}
            active={activeStep === i ? true : false}
            completed={activeStep >= i ? true : false}
          >
            <StepLabel
              sx={{ color: activeStep >= i ? "#FE4A49" : "gray" }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
const steps2 = ["Order Placed", "Processing", "Delivered"];
export const CheckOutSteps2 = ({ activeStep }) => {
  return (
    <Box sx={{ width: "100%" }} mb="1rem">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps2.map((item, i) => (
          <Step key={i}>
            <StepLabel>{item}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
