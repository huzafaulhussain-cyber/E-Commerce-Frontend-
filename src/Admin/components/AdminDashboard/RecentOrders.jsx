import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Card, CardHeader, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Chip, Avatar, Box 
} from '@mui/material';

const RecentOrders = () => {
  // Redux store se orders nikalna
  const { adminOrder } = useSelector((store) => store);
  
  // Sirf latest 5 orders dikhane ke liye (agar orders hain to)
  const recentOrders = adminOrder?.orders?.slice(0, 5) || [];

  // Status ke hisab se color set karne ka function
  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED': return 'success';
      case 'PENDING': return 'warning';
      case 'PLACED': return 'primary';
      case 'CONFIRMED': return 'info';
      case 'SHIPPED': return 'secondary';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ 
      bgcolor: '#1e293b', 
      color: '#fff', 
      borderRadius: '16px', 
      mt: 3, 
      border: '1px solid rgba(255,255,255,0.08)' 
    }}>
      <CardHeader 
        title="Recent Orders" 
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }} 
      />
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Products</TableCell>
              <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                  
                  {/* Order ID */}
                  <TableCell sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    #{order._id.slice(-6)} {/* Poori ID ki jagah last 6 digits */}
                  </TableCell>

                  {/* Customer Name */}
                  <TableCell sx={{ color: '#fff' }}>
                    {order.user?.firstName} {order.user?.lastName}
                  </TableCell>

                  {/* Product Images (Avatar Group style) */}
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {order.orderItems?.map((item, index) => (
                        <Avatar 
                          key={index} 
                          src={item.product?.imageUrl} 
                          sx={{ width: 30, height: 30, border: '1px solid #444' }} 
                        />
                      ))}
                    </Box>
                  </TableCell>

                  {/* Total Amount */}
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    Rs. {order.totalDiscountPrice}
                  </TableCell>

                  {/* Status Chip */}
                  <TableCell>
                    <Chip 
                      label={order.orderStatus} 
                      color={getStatusColor(order.orderStatus)} 
                      size="small" 
                      variant="filled"
                      sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}
                    />
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ color: '#94a3b8', py: 3 }}>
                  No recent orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrders;