import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Avatar, Button,
  Box, Typography, Pagination
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllCustomers, deleteCustomer } from '../../State/Admin/User/Action';

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminUsers } = useSelector(store => store);

  // 1. Pagination State
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  const handleRowClick = (userId) => {
    navigate(`/admin/customers/${userId}`);
  }

  const handleDelete = (e, userId) => {
    e.stopPropagation(); // Customer Details page khulne se rokne ke liye
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(userId));
    }
  }

  // --- PAGINATION LOGIC ---
  const totalUsers = adminUsers.users?.length || 0;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const displayedUsers = adminUsers.users?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // ✅ Responsive Outer Padding
    <Box sx={{ p: { xs: 1, sm: 2, md: 5 }, width: "100%",height:'100vh' }}>
      <Card sx={{ 
        mt: 2, 
        borderRadius: { xs: '8px', md: '16px' }, 
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" 
      }}>
        <CardHeader
          title="Customer Management"
          subheader={`Total Registered Users: ${totalUsers}`}
          titleTypographyProps={{ variant: { xs: 'h6', md: 'h5' }, fontWeight: 'bold' }}
          sx={{ bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
        />

        {/* ✅ Scrollable Table Container for Mobile */}
        <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflowX: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customers table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Email</TableCell>
                {/* ID Column Hidden on Mobile (xs) */}
                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9', display: { xs: 'none', md: 'table-cell' } }}>User ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Role</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedUsers?.map((user) => (
                <TableRow
                  key={user._id}
                  hover
                  onClick={() => handleRowClick(user._id)}
                  sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Avatar sx={{ 
                      bgcolor: deepPurple[500], 
                      width: { xs: 35, md: 45 }, 
                      height: { xs: 35, md: 45 },
                      fontSize: '1rem' 
                    }}>
                      {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                    </Avatar>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                      {user.firstName} {user.lastName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: 'nowrap' }}>
                      {user.email}
                    </Typography>
                  </TableCell>

                  {/* ID Hidden on Mobile */}
                  <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, color: 'gray', fontSize: '0.75rem' }}>
                    {user._id}
                  </TableCell>

                  <TableCell align="center">
                    <Box component="span" sx={{
                      px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold',
                      bgcolor: user.role === 'ADMIN' ? '#f3e5f5' : '#e8f5e9',
                      color: user.role === 'ADMIN' ? '#7b1fa2' : '#2e7d32',
                      border: user.role === 'ADMIN' ? '1px solid #ce93d8' : '1px solid #a5d6a7'
                    }}>
                      {user.role || 'CUSTOMER'}
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={(e) => handleDelete(e, user._id)}
                      disabled={user.role === "ADMIN"} // Admin khud ko delete na kar sake
                      sx={{ minWidth: '40px', borderRadius: '8px' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 2. PAGINATION SECTION */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          py: 3, 
          bgcolor: '#f8fafc',
          borderTop: '1px solid #e2e8f0' 
        }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            variant="outlined" 
            shape="rounded"
            size={window.innerWidth < 600 ? "small" : "medium"}
          />
          <Typography variant="caption" color="textSecondary">
            Total {totalUsers} Customers
          </Typography>
        </Box>
      </Card>
    </Box>
  )
}

export default Customers;