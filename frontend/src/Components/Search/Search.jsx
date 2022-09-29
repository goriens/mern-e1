import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export const Search = () => {
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    setKeyword(keyword);
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          size="large"
          variant="standard"
          placeholder="Search Product"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Link to={`/products/${keyword}`}>
          <SearchIcon onClick={searchHandler} />
        </Link>
      </Box>
    </>
  );
};
