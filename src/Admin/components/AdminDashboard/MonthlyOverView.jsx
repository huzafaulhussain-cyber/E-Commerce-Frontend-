import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import { PeopleOutline, ShoppingBagOutlined, AttachMoney, Inventory } from '@mui/icons-material';

const MonthlyOverView = ({ orders, customers, products }) => {
  
  const totalSales = orders?.reduce((acc, order) => acc + (order.totalDiscountPrice || 0), 0);

  const statData = [
    { title: 'Total Orders', stats: orders?.length || 0, icon: <ShoppingBagOutlined />, color: '#3b82f6' },
    { title: 'Total Sales', stats: `Rs.${totalSales?.toLocaleString()}`, icon: <AttachMoney />, color: '#22c55e' },
    { title: 'Customers', stats: customers?.length || 0, icon: <PeopleOutline />, color: '#06b6d4' },
    { title: 'Products', stats: products?.length || 0, icon: <Inventory />, color: '#eab308' },
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 2, 
      width: '100%',
      // height: '100%',
      justifyContent: 'space-between'
    }}>
      {statData.map((item, index) => (
        <Card key={index} sx={{
          bgcolor: '#1e293b',
          color: '#fff',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          p: 2,
          // ✅ BREAKPOINT LOGIC:
          // xs (Mobile): 100% (1 card per row)
          // sm (Tablet/800px): 48% (2 cards per row - yani 2x2)
          // lg (Desktop): 23.5% (4 cards per row)
          flex: { xs: '1 1 100%', sm: '1 1 48%', lg: '1 1 23.5%' },
          transition: 'transform 0.2s',
          '&:hover': { transform: 'translateY(-5px)' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <CardContent sx={{ p: '0 !important' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar variant="rounded" sx={{ bgcolor: `${item.color}22`, color: item.color, width: 42, height: 42 }}>
                {item.icon}
              </Avatar>
            </Box>
            <Typography variant='h5' sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
              {item.stats}
            </Typography>
            <Typography variant='body2' sx={{ color: '#94a3b8', fontWeight: 500 }}>
              {item.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MonthlyOverView;