import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/product/Action';
import {
  Button, FormControl, InputLabel, MenuItem, Select,
  TextField, Typography, Snackbar, Alert, CircularProgress,
  Box, Paper, Grid
} from '@mui/material'; // Simple Grid use kiya
import axios from 'axios';

const initialSizes = [
  { name: 'S', quantity: 0 },
  { name: 'M', quantity: 0 },
  { name: 'L', quantity: 0 },
];

const AddProduct = () => {
  const [productData, setProductData] = useState({
    imageUrl: '', brand: '', title: '', color: '', discountedPrice: '', price: '',
    discountPercent: '', size: initialSizes, quantity: '', topLevelCategory: '',
    secondLevelCategory: '', thirdLevelCategory: '', description: '',
    images: ['', '', '', '', '', '', ''],
  });

  const [l1List, setL1List] = useState([]);
  const [l2List, setL2List] = useState([]);
  const [l3List, setL3List] = useState([]);
  const [uploading, setUploading] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/categories/list?level=1`)
      .then(res => setL1List(res.data))
      .catch(err => console.log("L1 Load Error", err));
  }, []);

  const handleTopChange = async (e) => {
    const categoryId = e.target.value;
    setProductData({ ...productData, topLevelCategory: categoryId, secondLevelCategory: '', thirdLevelCategory: '' });
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories/list?level=2&parent=${categoryId}`);
    setL2List(res.data);
  };

  const handleSecondChange = async (e) => {
    const categoryId = e.target.value;
    setProductData({ ...productData, secondLevelCategory: categoryId, thirdLevelCategory: '' });
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories/list?level=3&parent=${categoryId}`);
    setL3List(res.data);
  };

  const handleImageUpload = async (e, slot) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, [slot]: true }));
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ohmwws5g");
    data.append("cloud_name", "dbrukcpr2");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dbrukcpr2/image/upload", {
        method: "POST",
        body: data,
      });

      const fileData = await res.json();
      if (fileData.secure_url) {
        if (slot === 'slot1') {
          setProductData(prev => ({ ...prev, imageUrl: fileData.secure_url }));
        } else {
          const indexMap = { slot2: 0, slot3: 1, slot4: 2, slot5: 3, slot6: 4, slot7: 5, slot8: 6 };
          const index = indexMap[slot];
          const newImages = [...productData.images];
          newImages[index] = fileData.secure_url;
          setProductData(prev => ({ ...prev, images: newImages }));
        }
        setSnackbarMessage(`${slot} Uploaded!`);
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('Upload failed!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setUploading(prev => ({ ...prev, [slot]: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({ ...prevState, size: sizes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     const finalData = {
      ...productData,
      price: Number(productData.price) || 0,
      discountedPrice: Number(productData.discountedPrice) || 0,
      discountPercent: Number(productData.discountPercent) || 0,
      quantity: Number(productData.quantity) || 0,
       images: productData.images.filter(img => img.trim() !== ''),
       size: productData.size.map(s => ({
        ...s,
        quantity: Number(s.quantity) || 0
      }))
    };

    console.log("Checking Data before API call:", finalData);

    try {
      const response = await dispatch(createProduct(finalData));
      console.log("Success Response:", response);
      alert("Product Add Ho Gaya!");
    } catch (error) {
      // Ye line aapko batayegi ke asal mein server ne kya message bheja
      console.error("Server ne reject kiya:", error.response?.data?.message || error.message);
      alert("Error: " + (error.response?.data?.message || "Server Internal Issue"));
    }
  };

  const inputStyle = {
    "& .MuiInputBase-root": { height: { md: '65px' }, fontSize: { md: '1.1rem' } },
    "& .MuiInputLabel-root": { fontSize: { md: '1.1rem' } }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f9f9f9', pb: 5 }}>
      <Typography variant="h3" sx={{ textAlign: 'center', py: 5, fontWeight: '800' }}>
        ADD NEW PRODUCT
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ px: { xs: 1, md: 5 } }}>

          {/* IMAGE SLOTS */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {[
                { label: 'Main', slot: 'slot1', current: productData.imageUrl },
                { label: 'Slot 2', slot: 'slot2', current: productData.images[0] },
                { label: 'Slot 3', slot: 'slot3', current: productData.images[1] },
                { label: 'Slot 4', slot: 'slot4', current: productData.images[2] },
                { label: 'Slot 5', slot: 'slot5', current: productData.images[3] },
                { label: 'Slot 6', slot: 'slot6', current: productData.images[4] },
                { label: 'Slot 7', slot: 'slot7', current: productData.images[5] },
                { label: 'Slot 8', slot: 'slot8', current: productData.images[6] }
              ].map((item) => (
                <Grid item xs={6} sm={4} md={1.5} key={item.slot}>
                  <Paper elevation={2} sx={{ p: 1, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{item.label}</Typography>
                    <Button variant="contained" component="label" fullWidth size="small" sx={{ my: 1, bgcolor: '#222' }}>
                      {uploading[item.slot] ? <CircularProgress size={16} color="inherit" /> : "Upload"}
                      <input type="file" hidden onChange={(e) => handleImageUpload(e, item.slot)} />
                    </Button>
                    {item.current && <img src={item.current} alt="pre" style={{ width: '100%', height: '80px', objectFit: 'cover' }} />}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* INPUT FIELDS */}
          <Grid item xs={12}><TextField label="Image URL" name="imageUrl" value={productData.imageUrl} onChange={handleChange} fullWidth sx={inputStyle} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Brand" name="brand" value={productData.brand} onChange={handleChange} fullWidth sx={inputStyle} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Title" name="title" value={productData.title} onChange={handleChange} required fullWidth sx={inputStyle} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Color" name="color" value={productData.color} onChange={handleChange} fullWidth sx={inputStyle} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Quantity" name="quantity" value={productData.quantity} onChange={handleChange} type="number" fullWidth sx={inputStyle} /></Grid>
          <Grid item xs={12} md={4}><TextField label="Price" name="price" value={productData.price} onChange={handleChange} type="number" required fullWidth sx={inputStyle} /></Grid>
          <Grid item xs={12} md={4}><TextField label="Discounted Price" name="discountedPrice" value={productData.discountedPrice} onChange={handleChange} type="number" fullWidth sx={inputStyle} /></Grid>
          <Grid item xs={12} md={4}><TextField label="Discount %" name="discountPercent" value={productData.discountPercent} onChange={handleChange} type="number" fullWidth sx={inputStyle} /></Grid>

          {/* <Grid item xs={12}> */}
            <TextField label="Description" name="description" multiline rows={4}  onChange={handleChange} value={productData.description} fullWidth />
          {/* </Grid> */}

          {/* CATEGORIES */}
          {/* <Grid item xs={12} md={4}> */}
            <FormControl sx={{width:'32%'}}>
              <InputLabel>Top Level Category</InputLabel>
              <Select value={productData.topLevelCategory} onChange={handleTopChange} label="Top Level Category">
                {l1List.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
              </Select>
            </FormControl>
          {/* </Grid> */}

          {/* <Grid item xs={12} md={4}> */}
            <FormControl sx={{width:'32%'}} disabled={!l2List.length}>
              <InputLabel>Second Level Category</InputLabel>
              <Select value={productData.secondLevelCategory} onChange={handleSecondChange} label="Second Level Category">
                {l2List.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
              </Select>
            </FormControl>
          {/* </Grid> */}

          {/* <Grid item xs={12} md={4}> */}
            <FormControl sx={{width:'32%'}} disabled={!l3List.length}>
              <InputLabel>Third Level Category</InputLabel>
              <Select name="thirdLevelCategory" value={productData.thirdLevelCategory} onChange={handleChange} label="Third Level Category" required>
                {l3List.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
              </Select>
            </FormControl>
          {/* </Grid> */}

          {/* SIZES */}
          {productData.size.map((size, index) => (
            <Fragment key={index}>
              <Grid item xs={6}><TextField label="Size" name="name" value={size.name} onChange={(e) => handleSizeChange(e, index)} fullWidth sx={inputStyle} /></Grid>
              <Grid item xs={6}><TextField label="Stock" name="quantity" type="number" value={size.quantity} onChange={(e) => handleSizeChange(e, index)} fullWidth sx={inputStyle} /></Grid>
            </Fragment>
          ))}

          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth sx={{ py: 2, fontWeight: 'bold', bgcolor: '#4f46e5' }}>Create Product</Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProduct;