import React from 'react';
import { Button, Card, CardContent, styled, Typography, Box } from '@mui/material';
import trophy from './trophy.png'; // Path sahi check karlein
import { useNavigate } from 'react-router-dom'; 

const TrophyImg = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: '20%',
  right: '10px',
  // 800px ke aas paas (md) aur mobile (xs) par size handle kiya
  width: '120px',
  [theme.breakpoints.down('md')]: { width: '100px' },
  [theme.breakpoints.down('sm')]: { width: '80px' },
  filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.3))',
  opacity: 0.9,
}));

const Achievement = ({ orders }) => {
  const navigate = useNavigate();

  // Calculation
  const totalSales = orders?.reduce((acc, order) => acc + (order.totalDiscountPrice || 0), 0);

  return (
    <Card sx={{
      position: 'relative',
      bgcolor: '#1e293b',
      color: '#fff',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    }}>
      <CardContent sx={{ p: { xs: 2, md: 3 }, width: '100%' }}>
        <Typography variant='h6' sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: '1.1rem', md: '1.3rem' } }}>
          Shop Revenue 🎉
        </Typography>
        <Typography variant='body2' sx={{ color: '#94a3b8', mb: 2, maxWidth: '60%' }}>
          Total processed sales
        </Typography>
        
        <Box sx={{ mb: 2 }}>
            <Typography variant='h4' sx={{ fontWeight: 800, color: '#f472b6', fontSize: { xs: '1.6rem', md: '2rem' } }}>
              Rs.{totalSales?.toLocaleString()}
            </Typography>
            <Typography variant='body2' sx={{ color: '#fff', opacity: 0.7 }}>
              {orders?.length} Orders Completed
            </Typography>
        </Box>

        <Button 
          onClick={() => navigate("/admin/orders")}
          variant='contained' 
          size="small" 
          sx={{ 
            background: 'linear-gradient(90deg, #d946ef, #9333ea)', 
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 'bold',
            px: 3
          }}
        >
          View Details
        </Button>
      </CardContent>
      
      <TrophyImg src={trophy} alt="Trophy" />
    </Card>
  );
};

export default Achievement;