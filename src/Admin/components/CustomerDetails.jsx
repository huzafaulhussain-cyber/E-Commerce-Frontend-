import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrdersByUser } from '../../State/Admin/Order/Action';
import {
    Card, CardHeader, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Avatar, Grid, Typography, Box
} from '@mui/material';
import { deepPurple, green } from '@mui/material/colors';
import AvatarGroup from '@mui/material/AvatarGroup';

const CustomerDetails = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const { adminOrder, adminUsers } = useSelector(store => store);
    const userOrders = Array.isArray(adminOrder?.orders) ? adminOrder.orders : [];

    useEffect(() => {
        if (userId) {
            dispatch(getOrdersByUser(userId));
        }
    }, [dispatch, userId]);

    // --- CALCULATIONS ---
    const totalSpent = userOrders.reduce((acc, order) => acc + (order.totalDiscountPrice || 0), 0);
    const totalOrders = userOrders.length;
    
    const userInfo = adminUsers.users?.find(u => u._id === userId) || userOrders[0]?.user || {};
    
    // Unique Addresses
    const uniqueAddresses = [];
    const seenAddresses = new Set();
    userOrders.forEach(order => {
        if (order.shippingAddress && !seenAddresses.has(order.shippingAddress._id)) {
            seenAddresses.add(order.shippingAddress._id);
            uniqueAddresses.push(order.shippingAddress);
        }
    });

    return (
        <Box sx={{ height:'100vh',  p: { xs: 1, sm: 3, md: 5 } }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                Customer Profile
            </Typography>

            {/* --- TOP INFO CARDS --- */}
            <Grid container spacing={3} sx={{ mb: 5 }}>

                {/* 1. Basic Info */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#f9fafb', height: '100%' }}>
                        <Avatar sx={{ bgcolor: deepPurple[500], width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 } }}>
                            {userInfo.firstName ? userInfo.firstName[0].toUpperCase() : "?"}
                        </Avatar>
                        <Box sx={{ overflow: 'hidden' }}>
                            <Typography variant='h6' fontWeight='bold' noWrap>
                                {userInfo.firstName} {userInfo.lastName}
                            </Typography>
                            <Typography variant='body2' color='textSecondary' noWrap>{userInfo.email}</Typography>
                            <Typography variant='caption' display="block" color='textSecondary'>ID: {userId?.slice(-6)}...</Typography>
                        </Box>
                    </Card>
                </Grid>

                {/* 2. Spending Stats */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 3, bgcolor: '#e8f5e9', height: '100%' }}>
                        <Typography variant='subtitle1' color={green[800]} fontWeight="bold">Total Spent</Typography>
                        <Typography variant='h4' fontWeight='bold' color={green[900]} sx={{ fontSize: { xs: '1.8rem', md: '2.125rem' } }}>
                            Rs. {totalSpent.toLocaleString()}
                        </Typography>
                        <Typography variant='body2' mt={1}>Total Orders: {totalOrders}</Typography>
                    </Card>
                </Grid>

                {/* 3. Saved Addresses */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3, maxHeight: 160, overflowY: 'auto', height: '100%' }}>
                        <Typography variant='subtitle1' fontWeight="bold" mb={1}>Saved Addresses</Typography>
                        {uniqueAddresses.length > 0 ? (
                            uniqueAddresses.map((addr, index) => (
                                <Box key={index} sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1, borderBottom: '1px solid #eee', pb: 0.5 }}>
                                    {addr.streetAddress}, {addr.city}
                                </Box>
                            ))
                        ) : (
                            <Typography variant="caption" color="textSecondary">No addresses found</Typography>
                        )}
                    </Card>
                </Grid>
            </Grid>

            {/* --- ORDER HISTORY TABLE --- */}
            <Card sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                <CardHeader 
                    title={`Order History (${totalOrders})`} 
                    sx={{ bgcolor: '#f4f4f4', p: 2 }} 
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                />
                
                {/* Scrollable Container for Mobile */}
                <TableContainer component={Paper} sx={{ maxHeight: 500, overflowX: 'auto' }}>
                    <Table stickyHeader sx={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Order</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Shipping Info</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Product</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Payment</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userOrders.length > 0 ? (
                                userOrders.map((order) => (
                                    <TableRow key={order._id} hover>
                                        <TableCell>
                                            <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                                                {order.orderItems?.map((i) => (
                                                    <Avatar
                                                        key={i._id}
                                                        src={i.product?.imageUrl}
                                                        sx={{ width: 40, height: 40, border: "1px solid #ddd" }}
                                                    />
                                                ))}
                                            </AvatarGroup>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 150 }}>
                                                <Typography variant="body2" fontWeight="bold">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</Typography>
                                                <Typography variant="caption" color="textSecondary">{order.shippingAddress?.city}</Typography>
                                                <Typography variant="caption" color="primary" fontWeight="medium">📞 {order.shippingAddress?.mobile}</Typography>
                                            </Box>
                                        </TableCell>

                                        <TableCell align="center">
                                            {order.orderItems?.map(i => (
                                                <Box key={i._id} sx={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                                                    {i.product?.brand?.slice(0,10)}... <span style={{ color: 'gray' }}>x{i.quantity}</span>
                                                </Box>
                                            ))}
                                        </TableCell>

                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Rs. {order.totalDiscountPrice}
                                        </TableCell>

                                        <TableCell align="center">
                                            <Box component="span" sx={{
                                                py: 0.5, px: 1.5, borderRadius: '20px', fontSize: '0.7rem', color: 'white', fontWeight: 'bold',
                                                bgcolor: order.orderStatus === 'DELIVERED' ? '#2e7d32' : order.orderStatus === 'CANCELLED' ? '#d32f2f' : '#1976d2'
                                            }}>
                                                {order.orderStatus}
                                            </Box>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Box component="span" sx={{
                                                py: 0.5, px: 1.5, borderRadius: '20px', fontSize: '0.7rem', color: 'white', fontWeight: 'bold',
                                                bgcolor: order.paymentDetails?.paymentStatus === "COMPLETED" ? '#2e7d32' : '#ed6c02'
                                            }}>
                                                {order.paymentDetails?.paymentStatus || "PENDING"}
                                            </Box>
                                        </TableCell>

                                        <TableCell align="center" sx={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                                        <Typography color="textSecondary">No Orders Found for this User</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default CustomerDetails;