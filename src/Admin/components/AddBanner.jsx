import React, { useState } from 'react';
import {
  Button, Grid, Typography, CircularProgress,
  Box, Snackbar, Alert, Paper, IconButton, Divider
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CollectionsIcon from '@mui/icons-material/Collections';
import axios from 'axios';

const AddBanner = () => {
  const [bannerImages, setBannerImages] = useState(['', '', '']);
  const [bannerUploading, setBannerUploading] = useState([false, false, false]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleBannerUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newUploadingStates = [...bannerUploading];
    newUploadingStates[index] = true;
    setBannerUploading(newUploadingStates);

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
        const newBanners = [...bannerImages];
        newBanners[index] = fileData.secure_url;
        setBannerImages(newBanners);
        setSnackbarMessage(`Banner ${index + 1} Uploaded!`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('Upload Failed!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      newUploadingStates[index] = false;
      setBannerUploading([...newUploadingStates]);
    }
  };

  const handleRemoveBanner = (index) => {
    const newBanners = [...bannerImages];
    newBanners[index] = '';
    setBannerImages(newBanners);
    setSnackbarMessage('Banner removed. Click save to apply.');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
  };

  const handleSaveBanners = async () => {
    const finalBanners = bannerImages.filter(img => img !== '');
    if (finalBanners.length === 0) {
      setSnackbarMessage("Please upload at least one banner!");
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/banners`,
        { images: finalBanners });
      setSnackbarMessage('Home Carousel Updated!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Server Error!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#0f172a', minHeight: '100vh', color: '#fff' }}>

      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#9333ea', width: 56, height: 56 }}>
          <CollectionsIcon />
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-1px' }}>
            Carousel Manager
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Update your homepage sliders. Recommended size: 1920x600 px.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 5 }} />

      <Grid container spacing={4}>
        {bannerImages.map((url, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: '#1e293b',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-5px)', borderColor: '#9333ea' }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#f472b6' }}>
                  Slot 0{i + 1}
                </Typography>
                {url && (
                  <IconButton size="small" onClick={() => handleRemoveBanner(i)} sx={{ color: '#ef4444' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <Box
                sx={{
                  height: '180px',
                  borderRadius: '12px',
                  bgcolor: '#0f172a',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  mb: 2
                }}
              >
                {url ? (
                  <img
                    src={url}
                    alt="banner"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Box sx={{ textAlign: 'center', opacity: 0.4 }}>
                    <CloudUploadIcon sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="caption" display="block">No Image</Typography>
                  </Box>
                )}

                {bannerUploading[i] && (
                  <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <CircularProgress size={30} sx={{ color: '#9333ea' }} />
                  </Box>
                )}
              </Box>

              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                disabled={bannerUploading[i]}
                sx={{
                  bgcolor: url ? 'rgba(147, 51, 234, 0.1)' : '#9333ea',
                  color: url ? '#d8b4fe' : '#fff',
                  boxShadow: url ? 'none' : '0px 4px 12px rgba(147, 51, 234, 0.3)',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  '&:hover': { bgcolor: url ? 'rgba(147, 51, 234, 0.2)' : '#7e22ce' }
                }}
              >
                {url ? 'Change Image' : 'Upload Banner'}
                <input type="file" hidden onChange={(e) => handleBannerUpload(e, i)} />
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Save Button Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={handleSaveBanners}
          sx={{
            px: 6,
            py: 1.8,
            fontSize: '1.1rem',
            fontWeight: '900',
            borderRadius: '14px',
            background: 'linear-gradient(90deg, #d946ef, #9333ea)',
            boxShadow: '0px 8px 24px rgba(147, 51, 234, 0.4)',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(90deg, #c026d3, #7e22ce)',
              transform: 'scale(1.02)'
            },
            transition: 'all 0.2s'
          }}
        >
          Save All Banners
        </Button>
        <Typography variant="body2" sx={{ mt: 2, color: '#64748b' }}>
          Changes will reflect on the homepage instantly after saving.
        </Typography>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: '100%', borderRadius: '12px' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Help helper for Avatar import missing
const Avatar = ({ children, sx }) => (
  <Box sx={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '12px', ...sx
  }}>
    {children}
  </Box>
);

export default AddBanner;