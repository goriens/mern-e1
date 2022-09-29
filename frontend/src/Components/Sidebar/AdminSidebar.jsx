import { Stack, Typography } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import ReviewsIcon from "@mui/icons-material/Reviews";
import TreeView from "@mui/lab/TreeView";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import TreeItem from "@mui/lab/TreeItem";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import { Link } from "react-router-dom";
export const AdminSidebar = () => {
  return (
    <>
      <Stack spacing={2}>
        <Typography>
          <Link to="/admin/dashboard" style={{ display: "flex" }}>
            <DashboardIcon /> Dashboard
          </Link>
        </Typography>
        <TreeView
          display="flex"
          defaultCollapseIcon={<AltRouteIcon />}
          defaultExpandIcon={<AccountTreeIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
        <Link to="/admin/orders" style={{ display: "flex" }}>
          <Typography display="flex">
            <AddShoppingCartIcon /> Orders
          </Typography>
        </Link>
        <Link to="/admin/users" style={{ display: "flex" }}>
          <Typography display="flex">
            <GroupIcon /> Users
          </Typography>
        </Link>
        <Link to="/admin/reviews" style={{ display: "flex" }}>
          <Typography display="flex">
            <ReviewsIcon /> Reviews
          </Typography>
        </Link>
      </Stack>
    </>
  );
};
