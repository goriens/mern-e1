import React, { useEffect } from "react";
import { AdminSidebar } from "../../Components/Sidebar/AdminSidebar";
import { Box, Chip, Typography } from "@mui/material";
import "./Dashboard.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChartFun } from "../../Components/Charts/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllProductAdmin } from "../../Redux/Admin/action";
import { getAllUsers } from "./../../Redux/Admin/action";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminReducer);
  const { orders } = useSelector((state) => state.adminOrderReducer);
  const { users } = useSelector((state) => state.adminUserReducer);

  let earning = orders?.orders?.reduce(function (accumulator, item) {
    return accumulator + item?.totalPrice;
  }, 0);

  let outOfStock = 0;
  let stock = 0;
  products?.products &&
    products?.products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      } else {
        stock += 1;
      }
    });

  useEffect(() => {
    if (orders?.length === 0) {
      dispatch(getAllOrders());
    }
    if (users?.length === 0) {
      dispatch(getAllUsers());
    }
    if (products?.length === 0) {
      dispatch(getAllProductAdmin());
    }
  }, [dispatch, products?.length, orders?.length, users?.length]);

  const data = [
    {
      name: "Sales",
      uv: 0,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Sales",
      uv: earning / 100,
      pv: 2400,
      amt: 2400,
    },
  ];

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
        <Typography variant="h4">Dashboard</Typography>
        <Box display="grid" gridTemplateColumns="auto auto auto auto" p={1}>
          <Box
            textAlign="center"
            border="2px solid gray"
            m="5px"
            p="8px"
            borderRadius="10px"
          >
            <Chip label="Total Products" />
            <Typography variant="h4"> {products?.products?.length}</Typography>
          </Box>
          <Box
            textAlign="center"
            border="2px solid gray"
            m="5px"
            p="8px"
            borderRadius="10px"
          >
            <Chip label="Total Orders" />
            <Typography variant="h4"> {orders?.orders?.length}</Typography>
          </Box>
          <Box
            textAlign="center"
            border="2px solid gray"
            m="5px"
            p="8px"
            borderRadius="10px"
          >
            <Chip label="Total Users" />
            <Typography variant="h4">{users?.users?.length}</Typography>
          </Box>
          <Box
            textAlign="center"
            border="2px solid gray"
            m="5px"
            p="8px"
            borderRadius="10px"
          >
            <Chip label="Total Earned" />
            <Typography variant="h4">₹ {earning / 100}.00 </Typography>
          </Box>
        </Box>

        <Box height="300px" mt={5}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
        <Typography mt={3} variant="h4">
          Product Stocks
        </Typography>
        <Box display="flex" justifyContent="center" textAlign="center">
          <PieChartFun outOfStock={outOfStock} stock={stock} />
        </Box>
      </Box>
    </Box>
  );
};
