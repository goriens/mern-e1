import React, { useState } from "react";
import { useEffect } from "react";
import "./Products.css";
import { getProducts } from "./../../Redux/App/action";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { MetaData } from "../../Components/Layout/MetaData";
import { NavLink, useParams } from "react-router-dom";
import { ProductCart } from "../../Components/Cart/ProductCart";
import { Sidebar } from "./../../Components/Sidebar/Sidebar";

export const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [price, setPrice] = React.useState([0, 10000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = React.useState(0);
  const [sort, setSort] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const {
    isLoading,
    isError,
    allProducts,
    productCount,
    resultPerPage,
    totalPages,
  } = useSelector((state) => state.productReducer);

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getProducts(keyword, page, price, category, rating));
  }, [dispatch, keyword, page, price, category, rating]);

  allProducts.sort((a, b) => {
    if (sort === "asc") {
      if (a.price < b.price) return -1;
    }
    if (sort === "desc") {
      if (b.price < a.price) return -1;
    }
    return 0;
  });

  return (
    <Box display="flex" width="90%" m="auto">
      <MetaData title="Products" />
      <Box>
        <Sidebar
          price={price}
          priceHandler={priceHandler}
          category={category}
          setCategory={setCategory}
          rating={rating}
          setRating={setRating}
          sort={sort}
          handleChange={handleChange}
        />
      </Box>
      <Box>
        <Box m="2rem">
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
              <Box className="card-grid" mt="4rem">
                {allProducts.length > 0 &&
                  allProducts.map((item) => (
                    <NavLink to={`/product/${item._id}`} key={item._id}>
                      <ProductCart {...item} />
                    </NavLink>
                  ))}
              </Box>
            </>
          )}
          <Box
            width="90%"
            m="auto"
            display="flex"
            justifyContent="center"
            mt="2rem"
          >
            {resultPerPage < productCount && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
