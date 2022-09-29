import React from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Fade,
  Badge,
  AppBar,
  Container,
  Toolbar,
} from "@mui/material";
import { BLUE_COLOR, ORANGE_COLOR } from "../Colors/Colors";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { userLogout } from "../../Redux/Auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";

const pages = [
  { page: "Products", route: "products" },
  { page: "About Us", route: "about" },
  { page: "Contact Us", route: "contact" },
];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.authReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function logoutUser() {
    dispatch(userLogout());
    toast.success("Logout Successfully", {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: `${BLUE_COLOR}` }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CodeIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: `${ORANGE_COLOR}`,
            }}
          />
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color: `${ORANGE_COLOR}`,
                fontSize: "2rem",
              }}
            >
              GOUR
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((item) => (
                <MenuItem key={item.page} onClick={handleCloseNavMenu}>
                  <Link to={`/${item.route}`}>
                    <Typography textAlign="center">{item.page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link to="/">
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color: `${ORANGE_COLOR}`,
                fontSize: "2rem",
              }}
            >
              GOUR
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((item) => (
              <Button
                key={item.page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to={`/${item.route}`}>
                  <Typography
                    textAlign="center"
                    sx={{ color: `${ORANGE_COLOR}` }}
                  >
                    {item.page}
                  </Typography>
                </Link>
              </Button>
            ))}
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            backgroundColor={`${BLUE_COLOR}`}
            alignItems="center"
            p="10px 10px"
            sx={{ flexGrow: 0 }}
          >
            {isAuth ? (
              <Stack direction="row" spacing={0.4} alignItems="center">
                {cartItems.length > 0 && (
                  <NavLink to="/cart">
                    <Badge badgeContent={cartItems.length} color="secondary">
                      <ShoppingCartSharpIcon
                        sx={{ color: `${ORANGE_COLOR}` }}
                      />
                    </Badge>
                  </NavLink>
                )}
                <div>
                  <Button
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{
                      color: `${ORANGE_COLOR}`,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      fontSize: "1.1rem",
                    }}
                    size="large"
                  >
                    {user && user?.user?.firstName}
                    <ArrowDropDownIcon />
                    <Avatar
                      alt={user && user?.user?.firstName}
                      src={user?.user?.avatar?.url}
                    />
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    {user?.user?.role === "admin" && (
                      <MenuItem sx={{ width: "180px" }} onClick={handleClose}>
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleClose}>
                      <NavLink to="/account">My account</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavLink to="/cart">Cart ({cartItems.length})</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavLink to="/orders">My Orders</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        sx={{
                          color: "red",
                          textTransform: "capitalize",
                          fontSize: "16px",
                        }}
                        size="small"
                        onClick={logoutUser}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </Menu>
                </div>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1}>
                <NavLink to="/register">
                  <Button variant="contained">Join</Button>
                </NavLink>
                <NavLink to="/login">
                  <Button variant="contained" color="success">
                    Login
                  </Button>
                </NavLink>
              </Stack>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
