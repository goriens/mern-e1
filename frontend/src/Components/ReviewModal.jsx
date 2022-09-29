import {
  Box,
  Button,
  Modal,
  Rating,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { BLUE_COLOR, ORANGE_COLOR } from "./Colors/Colors";
import { useParams } from "react-router-dom";
import {
  clearError,
  createReview,
  getSingleProducts,
} from "../Redux/App/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export const ReviewModel = ({ handleOpen, open, handleClose, dispatch }) => {
  const { isError, review } = useSelector((state) => state.reviewReducer);
  const { id } = useParams();
  const submitReviewToggle = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(
      createReview({
        rating: data.get("rating"),
        comment: data.get("comment"),
        productId: id,
      })
    );

    review &&
      toast.success("Thanks for Your Suggestion", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    handleClose(false);
  };

  isError?.success === false &&
    toast.error("Please Login First", {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  useEffect(() => {
    if (review) {
      dispatch(getSingleProducts(id));
    }
    if (isError) {
      dispatch(clearError());
    }
  }, [dispatch, id, review, isError]);

  return (
    <div>
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
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          backgroundColor: `${BLUE_COLOR}`,
          color: `${ORANGE_COLOR}`,
          width: "150px",
        }}
        size="small"
      >
        Add Review
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          noValidate
          onSubmit={submitReviewToggle}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Write a Review
          </Typography>
          <Stack spacing={2}>
            <Rating size="large" name="rating" />
            <TextareaAutosize
              aria-label="empty textarea"
              minRows={8}
              placeholder="Write your review"
              style={{ width: "auto" }}
              name="comment"
            />
          </Stack>
          <Box sx={{ width: "100%", textAlign: "right" }}>
            <Button
              variant="outlined"
              sx={{
                m: "10px 3px",
              }}
              color="error"
              size="small"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                m: "5px 1px",
              }}
              color="success"
              size="small"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
