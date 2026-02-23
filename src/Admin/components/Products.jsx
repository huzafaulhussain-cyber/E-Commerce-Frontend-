import {
  Table, TableRow, Paper, TableBody, TableCell,
  TableContainer, TableHead, Button, Card, CardHeader,
  Box, Avatar, Typography, Pagination, Chip
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts } from '../../State/product/Action';
import { useEffect, useState } from 'react';

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  const [pageNumber, setPageNumber] = useState(1);

  // Alert khatam kar diya, ab click karte hi foran delete hoga
  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  }

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };

  useEffect(() => {
    const data = {
      category: "",
      color: [],
      sizes: [], 
      minPrice: 0,
      maxPrice: 1000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: pageNumber,
      pageSize: 15,
      stock: ""
    };
    dispatch(findProducts(data));
  }, [dispatch, pageNumber, products.product]); 

  return (
    <Box sx={{ p: { xs: 0, sm: 2, md: 5 }, width: "100%", overflow: "hidden" }}>
      <Card sx={{
        mt: { xs: 0, sm: 2 },
        borderRadius: { xs: 0, sm: '16px' },
        boxShadow: { xs: "none", sm: "0px 10px 30px rgba(0,0,0,0.05)" },
        border: '1px solid #eef2f6'
      }}>
        <CardHeader
          title="Inventory Management"
          titleTypographyProps={{ variant: { xs: 'h6', md: 'h5' }, fontWeight: '900' }}
          sx={{ bgcolor: '#fff', borderBottom: '1px solid #f1f5f9', p: { xs: 2, md: 3 } }}
        />

        <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflowX: 'auto', borderRadius: 0, boxShadow: 'none' }}>
          <Table stickyHeader sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: '800', bgcolor: '#f8fafc', color: '#64748b' }}>IMAGE </TableCell>
                <TableCell align="center" sx={{ fontWeight: '800', bgcolor: '#f8fafc', color: '#64748b' }}>TITLE & BRAND</TableCell>
                <TableCell align="center" sx={{ fontWeight: '800', bgcolor: '#f8fafc', color: '#64748b' }}>CATEGORY TREE</TableCell>
                <TableCell align="center" sx={{ fontWeight: '800', bgcolor: '#f8fafc', color: '#64748b' }}>PRICE</TableCell>
                <TableCell align="center" sx={{ fontWeight: '800', bgcolor: '#f8fafc', color: '#64748b' }}>STOCK</TableCell>
                <TableCell align="center" sx={{ fontWeight: '800', bgcolor: '#f8fafc', color: '#64748b' }}>ACTION</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.products?.content?.map((item) => {
                const third = item.category?.name || "Top";
                const sec = item.category?.parent?.name || "Second";
                const top = item.category?.parent?.parent?.name || "Third";

                return (
                  <TableRow key={item._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={item.imageUrl} variant="rounded" sx={{ width: 50, height: 50, borderRadius: '8px', border: '1px solid #f1f5f9' }} />
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%'
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: '800', color: '#1e293b', lineHeight: 1.2 }}>
                          {item.brand}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#64748b',
                            fontWeight: '500',
                            maxWidth: '200px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textAlign: 'center'
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.5,
                        width: '100%'
                      }}>
                        <Typography sx={{ fontSize: '0.65rem', fontWeight: '900', color: '#4f46e5', bgcolor: '#eef2ff', px: 1, py: 0.2, borderRadius: '4px', textTransform: 'uppercase' }}>
                          {top}
                        </Typography>
                        <Typography sx={{ color: '#cbd5e1', fontWeight: 'bold' }}>&gt;</Typography>
                        <Typography sx={{ fontSize: '0.65rem', fontWeight: '700', color: '#7c3aed', bgcolor: '#f5f3ff', px: 1, py: 0.2, borderRadius: '4px' }}>
                          {sec}
                        </Typography>
                        <Typography sx={{ color: '#cbd5e1', fontWeight: 'bold' }}>&gt;</Typography>
                        <Typography sx={{ fontSize: '0.65rem', fontWeight: '600', color: '#059669', bgcolor: '#ecfdf5', px: 1, py: 0.2, borderRadius: '4px' }}>
                          {third}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <Typography sx={{ fontWeight: '800', color: '#0f172a' }}>
                        Rs. {item.discountedPrice}
                      </Typography>
                      {item.price > item.discountedPrice && (
                        <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94a3b8' }}>
                          Rs. {item.price}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={item.quantity > 0 ? `${item.quantity}` : "Out"}
                        size="small"
                        sx={{
                          fontWeight: '700',
                          fontSize: '0.7rem',
                          bgcolor: item.quantity > 0 ? '#f1f5f9' : '#fff1f2',
                          color: item.quantity > 0 ? '#475569' : '#e11d48'
                        }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        onClick={() => handleProductDelete(item._id)}
                        variant='text'
                        color="error"
                        size="small"
                        sx={{ fontWeight: '800', textTransform: 'none' }}
                      >
                        Delete
                      </Button>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 3,
          bgcolor: '#fff',
          borderTop: '1px solid #f1f5f9'
        }}>
          <Pagination
            count={products.products?.totalPages}
            page={pageNumber}
            onChange={handlePaginationChange}
            sx={{
              '& .MuiPaginationItem-root': { 
                fontWeight: 'bold', 
                borderRadius: '8px' 
              },
              // Aapka manga hua custom color (#248041)
              '& .Mui-selected': {
                bgcolor: '#248041 !important',
                color: '#fff !important'
              },
              '& .MuiPaginationItem-root:hover': {
                bgcolor: 'rgba(36, 128, 65, 0.1)'
              }
            }}
          />
        </Box>
      </Card>
    </Box>
  )
}

export default Products;