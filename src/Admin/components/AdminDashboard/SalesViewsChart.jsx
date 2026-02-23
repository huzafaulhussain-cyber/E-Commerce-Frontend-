import React from 'react';
import { Card, CardHeader, CardContent, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const SalesViewsChart = () => {
  // 1. Redux se orders nikalna
  const { adminOrder } = useSelector((store) => store);
  const orders = adminOrder?.orders || [];

  // 2. Data ko Mahine (Month) ke hisab se process karne ka logic
  const processChartData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Initial data structure
    const monthlyStats = months.map((month) => ({
      name: month,
      Sales: 0,
      Views: Math.floor(Math.random() * 50) + 10, // Placeholder Views jab tak backend na ho
    }));

    // Orders ko scan kar ke sales add karna
    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthIndex = date.getMonth(); // 0 = Jan, 1 = Feb...
      
      // Agar order confirmed ya delivered hai (Optional filter)
      if (order.orderStatus !== "CANCELLED") {
        monthlyStats[monthIndex].Sales += (order.totalDiscountPrice / 1000); // K (Thousands) mein dikhane ke liye
      }
    });

    // Sirf wahan tak dikhana jahan tak saal chal raha hai (optional)
    const currentMonth = new Date().getMonth();
    return monthlyStats.slice(0, currentMonth + 1);
  };

  const dynamicData = processChartData();

  return (
    <Card sx={{ 
      bgcolor: '#1e293b', 
      color: '#fff', 
      borderRadius: '16px', 
      border: '1px solid rgba(255,255,255,0.08)', 
      width: '100%', 
      height: '100%' 
    }}>
      <CardHeader 
        title="Sales performance" 
        subheader="Monthly sales in (K)"
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
        subheaderTypographyProps={{ color: '#94a3b8', fontSize: '12px' }}
      />
      <CardContent>
        <Box sx={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={dynamicData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
              />
              
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '8px', 
                  color: '#fff' 
                }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              
              {/* Dynamic Sales Bar */}
              <Bar dataKey="Sales" fill="#facc15" radius={[6, 6, 0, 0]} barSize={12} name="Sales (Rs in K)" />
              
              {/* Views Bar (Logic placeholder) */}
              <Bar dataKey="Views" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={12} name="Site Visits" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesViewsChart;