import React, { useEffect, useState } from "react"; // useState add kiya
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  deleteOrder,
  confirmOrder,
  shipOrder,
  deliveredOrder,
} from "../../State/Admin/Order/Action";
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  AvatarGroup,
  Avatar,
  MenuItem,
  Menu,
  Pagination, // Pagination import kiya
  Box,        // Box import kiya alignment ke liye
} from "@mui/material";

const Orders = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentOrderId, setCurrentOrderId] = React.useState(null);
  const open = Boolean(anchorEl);

  // 1. Pagination ke liye states
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setCurrentOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentOrderId(null);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deleted,
    dispatch
  ]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const handleShipedOrder = () => {
    dispatch(shipOrder(currentOrderId));
    handleClose();
  };

  const handleConfirmedOrder = () => {
    dispatch(confirmOrder(currentOrderId));
    handleClose();
  };

  const handleDeliveredOrder = () => {
    dispatch(deliveredOrder(currentOrderId));
    handleClose();
  };

  // 2. Pagination Logic: Orders ko slice karna 10-10 ke hisab se
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = adminOrder?.orders?.slice(indexOfFirstItem, indexOfLastItem);

  // Page change hone par handle karna
  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  return (
    <div sx={{}}>
      <Card sx={{ height:'100vh' }}>
        <CardHeader title="All Ordered Items" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="center">Price&nbsp;(Rs)</TableCell>
                <TableCell align="center">Order Status</TableCell>
                <TableCell align="center">Payment Status</TableCell> 
                <TableCell align="center">Update Status</TableCell>
                <TableCell align="center">Delete Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 3. Yahan adminOrder.orders ki jagah currentOrders use kiya */}
              {currentOrders?.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                      {item.orderItems?.map((orderItem) => (
                        <Avatar
                          key={orderItem._id}
                          alt={orderItem.product?.title || "Product image"}
                          src={orderItem.product?.imageUrl}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.orderItems?.map((orderItem) => (
                      <p key={orderItem._id}>{orderItem.product?.title}</p>
                    ))}
                  </TableCell>
                  <TableCell align="center">{item.totalDiscountPrice}</TableCell>
                  
                  <TableCell align="center">
                    <span
                      className={`py-2 px-3 rounded-full text-white text-sm font-medium ${
                        item.orderStatus === "CONFIRMED"
                          ? "bg-[#32a852]"
                          : item.orderStatus === "SHIPPED"
                          ? "bg-[#493af0]"
                          : item.orderStatus === "DELIVERED"
                          ? "bg-[#2e7d32]"
                          : item.orderStatus === "PLACED"
                          ? "bg-[#2196f3]"
                          : item.orderStatus === "PENDING"
                          ? "bg-[#a4a2b0]"
                          : "text-red-500"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </TableCell>

                  <TableCell align="center">
                    <span className={`py-2 px-3 rounded-full text-white text-sm font-medium ${
                        item.paymentDetails?.paymentStatus === "COMPLETED"
                            ? "bg-green-600"
                            : "bg-yellow-500"
                        }`}
                    >
                        {item.paymentDetails?.paymentStatus || "PENDING"}
                    </span>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      id={`basic-button-${item._id}`}
                      onClick={(event) => handleClick(event, item._id)}
                      variant="outlined"
                    >
                      Status
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleDeleteOrder(item._id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 4. Pagination UI Component */}
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <Pagination
            count={Math.ceil((adminOrder?.orders?.length || 0) / itemsPerPage)}
            page={page}
            onChange={handlePaginationChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
        
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleConfirmedOrder}>Confirmed Order</MenuItem>
          <MenuItem onClick={handleShipedOrder}>Shipped Order</MenuItem>
          <MenuItem onClick={handleDeliveredOrder}>Delivered Order</MenuItem>
        </Menu>
      </Card>
    </div>
  );
};

export default Orders;