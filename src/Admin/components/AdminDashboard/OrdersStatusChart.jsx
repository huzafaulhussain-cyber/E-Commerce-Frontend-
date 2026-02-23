import React from 'react';
import { Card, CardHeader, CardContent, Typography, Box, Divider } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import CircleIcon from '@mui/icons-material/Circle';

const OrdersStatusChart = ({ orders }) => {
  // Status wise counting
  const delivered = orders.filter(o => o.orderStatus === 'DELIVERED').length;
  const pending = orders.filter(o => o.orderStatus === 'PENDING' || o.orderStatus === 'PLACED').length;
  const shipped = orders.filter(o => o.orderStatus === 'SHIPPED').length;
  const confirmed = orders.filter(o => o.orderStatus === 'CONFIRMED').length;

  const total = orders.length || 1; // 0 se divide na ho jaye

  const data = [
    { name: 'Delivered', value: delivered, color: '#22c55e' },
    { name: 'Shipped', value: shipped, color: '#9333ea' },
    { name: 'Pending', value: pending, color: '#a4a2b0' },
    { name: 'Confirmed', value: confirmed, color: '#3b82f6' },
  ];

  return (
    <Card sx={{ bgcolor: '#1e293b', color: '#fff', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', width: '100%' }}>      <CardHeader title="Order Status Breakdown" titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Box sx={{ height: 250, position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius="70%" outerRadius="90%" paddingAngle={5} dataKey="value">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <Typography variant="h4">{orders.length}</Typography>
            <Typography variant="caption">Total Orders</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          {data.map((item) => (
            <Box key={item.name} sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                <CircleIcon sx={{ color: item.color, fontSize: 10, mr: 0.5 }} /> {item.name}
              </Typography>
              <Typography variant="body2" fontWeight="bold">{item.value}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrdersStatusChart;