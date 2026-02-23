import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, AppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

// Icons & Components
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ChatIcon from "@mui/icons-material/Chat";
import CategoryIcon from '@mui/icons-material/Category';
import { getUser } from '../State/Auth/Action';

// Components (Apne paths check karlein)
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Products from './components/Products';
import Customers from './components/Customers';
import Orders from './components/Orders';
import AddProduct from './components/AddProduct';
import AddBanner from './components/addBanner';
import CustomerDetails from './components/CustomerDetails';
import SubscribersList from './components/SubscribersList';
import SendPromotion from './components/SendPromotion';
import { SendIcon } from 'lucide-react';
import InquiryList from './components/InquiryList';
import CategoryManager from './components/CategoryList';



const drawerWidth = 240;

const menu = [
    { name: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
    { name: 'Navbar Categories', path: '/admin/categories', icon: <CategoryIcon /> },
    { name: 'Add Product', path: '/admin/product/create', icon: <AddBoxIcon /> },
    { name: 'Add Banner', path: '/admin/banner/create', icon: <AddBoxIcon /> },
    { name: 'Products', path: '/admin/products', icon: <ShoppingBagIcon /> },
    { name: 'Orders', path: '/admin/orders', icon: <ReceiptLongIcon /> },
    { name: 'Customers', path: '/admin/customers', icon: <PeopleIcon /> },
    { name: 'Subscribers', path: '/admin/subscribers', icon: <EmailIcon /> },
    { name: 'Marketing', path: '/admin/promotion', icon: <SendIcon /> },
    { name: 'Inquiries', path: '/admin/inquiries', icon: <ChatIcon /> },
];

const Admin = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store.auth);
    const jwt = localStorage.getItem("jwt");

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    useEffect(() => {
        if (jwt && !auth?.user) dispatch(getUser());
    }, [jwt, auth?.user, dispatch]);

    const drawer = (
        <Box sx={{ bgcolor: '#1e293b', height: '100%', color: 'white' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f472b6' }}>Admin Panel</Typography>
            </Toolbar>
            <List>
                {menu.map((item) => (
                    <ListItem key={item.name} disablePadding onClick={() => { navigate(item.path); setMobileOpen(false); }}>
                        <ListItemButton sx={{ '&:hover': { bgcolor: '#334155' } }}>
                            <ListItemIcon sx={{ color: '#94a3b8' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Mobile Header */}
            {!isLargeScreen && (
                <AppBar position="fixed" sx={{ bgcolor: '#0f172a', zIndex: theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">Admin Dashboard</Typography>
                    </Toolbar>
                </AppBar>
            )}

            {/* Sidebar Drawer */}
            <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
                <Drawer
                    variant={isLargeScreen ? "permanent" : "temporary"}
                    open={isLargeScreen ? true : mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none', bgcolor: '#1e293b' },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content Area */}
            <Box component="main" sx={{ bgcolor: '#0f172a', flexGrow: 1, p: 3, width: { lg: `calc(100% - ${drawerWidth}px)` }, mt: { xs: 8, lg: 0 } }}>
                <Routes>
                    <Route path='/' element={<AdminDashboard />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/customers/:userId' element={<CustomerDetails />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/product/create' element={<AddProduct />} />
                    <Route path='/banner/create' element={<AddBanner />} />
                    <Route path='/subscribers' element={<SubscribersList />} />
                    <Route path='/promotion' element={<SendPromotion />} />
                    <Route path='/inquiries' element={<InquiryList />} />
                    <Route path='/categories' element={<CategoryManager />} />

                </Routes>
            </Box>
        </Box>
    );
};

export default Admin;