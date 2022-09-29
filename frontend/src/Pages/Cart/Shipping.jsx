import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { BLUE_COLOR } from "../../Components/Colors/Colors";
import { CheckOutSteps } from "../../Components/Form/CheckOutSteps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveShippingInfo } from "./../../Redux/Cart/action";
import { useNavigate } from "react-router-dom";

export const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cartReducer);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      toast.error("Please Enter a Valid Phone Number", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(
        saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
      );
      navigate("/cart/confirm");
    }
  };

  return (
    <Box>
      <Box mt="3rem" mb="4rem">
        <CheckOutSteps activeStep={0} />
        <Stack
          spacing={1.4}
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          maxWidth="550px"
          m="auto"
        >
          <TextField
            fullWidth
            label="Address"
            helperText="Enter Your Address"
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="City"
            helperText="Enter Your City"
            variant="standard"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            fullWidth
            label="Pin Code"
            helperText="Enter Your Pin Code"
            variant="standard"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
          <TextField
            fullWidth
            type="number"
            label="Phone Number"
            helperText="Enter Your Phone Number"
            variant="standard"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Country
            </InputLabel>
            <Select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="">
                <em>Choose Country</em>
              </MenuItem>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <MenuItem key={item.isoCode} value={item.isoCode}>
                    {item.name} - {item.isoCode}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              State
            </InputLabel>
            <Select
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="">
                <em>Choose State</em>
              </MenuItem>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <MenuItem key={item.isoCode} value={item.isoCode}>
                    {item.name} - {item.isoCode}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            size="large"
            sx={{ backgroundColor: `${BLUE_COLOR}` }}
          >
            Submit
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
  );
};
