import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminSidebar } from "../../Components/Sidebar/AdminSidebar";
import { deleteReviews, getAllReviews } from "./../../Redux/Admin/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export const AdminReviews = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, reviews } = useSelector(
    (state) => state.adminReviewsReducer
  );
  const [productId, setProductId] = useState();

  const handleClick = () => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
  };
  const columns = [
    {
      field: "id",
      headerName: "User Id",
      minWidth: 150,
      flex: 2,
      sortable: false,
    },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "rating", headerName: "Rating", minWidth: 150, flex: 1 },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 150,
      flex: 3,
    },
    {
      field: "delete",
      headerName: "Delete Review",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton>
              <DeleteIcon
                onClick={() =>
                  handleDeleteReview(params.getValue(params.id, "id"))
                }
              />
            </IconButton>
          </>
        );
      },
    },
  ];
  const rows = [];
  reviews?.reviews &&
    reviews?.reviews?.forEach((item, i) => {
      rows.push({
        id: item._id,
        name: item.firstName + " " + item.lastName,
        rating: item.rating,
        comment: item.comment,
      });
    });
  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReviews(productId, reviewId));
    toast.success("Delete Review Successfully", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(getAllReviews(productId));
  };

  return (
    <Box p="3rem" display="grid" gridTemplateColumns="1fr 5fr">
      <Box
        p={2}
        boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        m="8px"
        borderRadius="8px"
      >
        <AdminSidebar />
      </Box>
      <Box
        p={2}
        boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        m="8px"
        borderRadius="8px"
      >
        <Box>
          <Box display="flex" justifyContent="space-between" m="2rem 0rem">
            <Typography variant="h4">Reviews</Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                label="Product ID"
                placeholder="Product ID"
                variant="standard"
                size="small"
                name="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
              <Button
                size="small"
                height="5px"
                variant="contained"
                onClick={handleClick}
              >
                Reviews
              </Button>
            </Stack>
          </Box>
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
          {reviews?.reviews?.length > 0 && (
            <Box width="1200px" m="auto">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={6}
                disableSelectionOnClick
                autoHeight
              />
            </Box>
          )}
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
    </Box>
  );
};
