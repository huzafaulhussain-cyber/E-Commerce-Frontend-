import { Box, Typography, Container, Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import Achievement from './Achievement';
import MonthlyOverView from './MonthlyOverView';
import OrdersStatusChart from './OrdersStatusChart';
import SalesViewsChart from './SalesViewsChart';
import RecentOrders from './RecentOrders';

import { getOrders } from '../../../State/Admin/Order/Action';
import { findProducts } from '../../../State/product/Action';
import { getAllCustomers } from '../../../State/Admin/User/Action';
import { logout } from '../../../State/Auth/Action';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminOrder, products, adminUsers } = useSelector(store => store);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getAllCustomers());
    dispatch(findProducts({
      category: "", color: [], size: [], minPrice: 0, maxPrice: 100000,
      minDiscount: 0, sort: "price_low", pageNumber: 1, pageSize: 100, stock: ""
    }));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box sx={{ bgcolor: '#0f172a', minHeight: '100vh', color: '#fff', pb: 5 }}>
      <Container maxWidth="xl">

        {/* --- HEADER --- */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 5, pt: 4, pb: 2,
          flexWrap: 'wrap', gap: 2,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
              Admin Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Ecommerce Real-time Overview
            </Typography>
          </Box>
          <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
            LogOut
          </Button>
        </Box>

        {/* --- ROW 1: Achievement & Overview --- */}
        <Box sx={{
          display: 'flex',
          // md (900px) par row ho jayega, sm (600px-800px) par hum isay set kar rahe hain
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          mb: 5,
          alignItems: 'stretch'
        }}>
          {/* Achievement Box: 800px par thora chota (30%) rakha hai */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%', lg: '1 1 35%' } }}>
            <Achievement orders={adminOrder?.orders || []} />
          </Box>

          {/* MonthlyOverview Box: 800px par 70% jagah lega taake 2x2 fit aaye */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 70%', lg: '1 1 65%' } }}>
            <MonthlyOverView
              orders={adminOrder?.orders || []}
              customers={adminUsers?.users || []}
              products={products?.products?.content || []}
            />
          </Box>
        </Box>

        {/* --- ROW 2: Charts --- */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 3,
          mb: 5,
          alignItems: 'stretch'
        }}>
          {/* Chart 1: Order Status */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 35%' } }}>
            <OrdersStatusChart orders={adminOrder?.orders || []} />
          </Box>

          {/* Chart 2: Sales Views */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 65%' } }}>
            <SalesViewsChart />
          </Box>
        </Box>

        {/* --- ROW 3: Table --- */}
        <Box sx={{ width: '100%' }}>
          <RecentOrders />
        </Box>

      </Container>
    </Box>
  );
};

export default AdminDashboard;