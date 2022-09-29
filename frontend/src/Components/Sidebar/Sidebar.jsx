import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Search } from "../Search/Search";
const categories = ["Mobile", "Laptop", "Cloths", "Shoes", "Electronics"];

export const Sidebar = ({
  price,
  priceHandler,
  category,
  setCategory,
  rating,
  setRating,
  sort,
  handleChange,
}) => {
  return (
    <Stack spacing={3} p={2} mt={4}>
      <Box width={200}>
        <Typography variant="h5">Search</Typography>
        <Search />
      </Box>
      <Divider />
      <Box>
        <Typography variant="h5">Categories</Typography>
        {categories.map((item) => (
          <Typography
            variant="body2"
            key={item}
            m="10px 0px"
            onClick={() => setCategory(item)}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#FE4A49",
                fontWeight: "bold",
              },
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
      <Divider />
      <Box>
        <Typography variant="h5">Sort By Price</Typography>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={sort}
          onChange={handleChange}
        >
          <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
          <FormControlLabel
            value="desc"
            control={<Radio />}
            label="Descending"
          />
        </RadioGroup>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h5">Rating</Typography>
        <Rating
          size="large"
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
    </Stack>
  );
};
