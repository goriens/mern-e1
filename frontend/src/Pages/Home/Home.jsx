import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { ProductCart } from "../../Components/Cart/ProductCart";
import { MetaData } from "../../Components/Layout/MetaData";
import { Slider } from "../../Components/Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { useEffect } from "react";
import { getProducts } from "../../Redux/App/action";
import { Link } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { isLoading, isError, allProducts } = useSelector(
    (state) => state.productReducer
  );

  // console.log(isLoading, isError, allProducts, productCount);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: "5rem",
          }}
        >
          <CircularProgress disableShrink />
        </Box>
      )}

      {isError && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: "5rem",
          }}
        >
          Something Went Wrong
        </Box>
      )}
      {allProducts.length > 0 && (
        <>
          <MetaData title="Gour Shop" />
          <Slider />
          <Box className="card-grid" mt="4rem" mb="4rem">
            {allProducts.length > 0 &&
              allProducts.map((item) => (
                <Link to={`product/${item._id}`} key={item._id}>
                  <ProductCart {...item} />
                </Link>
              ))}
          </Box>
        </>
      )}
    </>
  );
};
