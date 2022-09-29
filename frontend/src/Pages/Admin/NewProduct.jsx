import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BLUE_COLOR } from "../../Components/Colors/Colors";
import { AdminSidebar } from "../../Components/Sidebar/AdminSidebar";
import { clearError, createProduct } from "../../Redux/Admin/action";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CREATE_PRODUCT_SUCCESS } from "../../Redux/Admin/actionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, product } = useSelector(
    (state) => state.adminReducer
  );

  console.log("Pro", isError, isLoading, product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Mobile", "Laptop", "Cloths", "Shoes", "Electronics"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm)).then((r) => {
      if (r === CREATE_PRODUCT_SUCCESS) {
        toast.success("Product Created Successfully", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/admin/products", { replace: true });
        }, 2000);
      }
    });
  };

  const productImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    if (isError) {
      toast.error(isError?.message, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearError());
    }
  }, [dispatch, isError]);

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
        <Typography variant="h4">Create Product</Typography>
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

        <Box mt="3rem" mb="4rem">
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
              label="Name"
              variant="standard"
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Price"
              variant="standard"
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            <Typography sx={{ color: "gray" }}>Description *</Typography>
            <TextareaAutosize
              fullWidth
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minRows={5}
            />
            <TextField
              fullWidth
              label="Stock"
              variant="standard"
              type="number"
              placeholder="Stock"
              required
              onChange={(e) => setStock(e.target.value)}
            />

            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Categories
              </InputLabel>
              <Select
                required
                value={category}
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">
                  <em>Choose category</em>
                </MenuItem>
                {categories &&
                  categories.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div>
              <IconButton
                sx={{ color: `${BLUE_COLOR}` }}
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="avatar"
                  multiple
                  onChange={productImagesChange}
                />
                <CloudUploadIcon />
              </IconButton>
              {imagesPreview.length ? "Uploaded" : "Upload Product Images"}
            </div>

            <div id="create-product-image">
              {imagesPreview.map((item, i) => (
                <img key={i} src={item} alt="preview" />
              ))}
            </div>
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{ backgroundColor: `${BLUE_COLOR}` }}
              disabled={isLoading}
            >
              {isLoading ? "Product Creating..." : "Submit"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
