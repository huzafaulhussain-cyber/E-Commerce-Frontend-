import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid, CircularProgress, Divider, IconButton } from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SendPromotion = () => {
    const [promo, setPromo] = useState({
        subject: 'Special Offer: 50% Discount on All Items!',
        title: 'New Season Sale is Live!',
        message: 'Aap ke liye hamari website par bari sale lag gayi hai. Limited stock available hai, abhi order karein!',
        bannerUrl: 'https://img.freepik.com/free-vector/special-offer-modern-sale-banner-template_1017-20667.jpg',
        buttonLink: import.meta.env.VITE_FRONTEND_URL
    });

    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false); // Image upload state

    // 🔥 Image Upload Logic (Cloudinary)
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ohmwws5g"); // Aapka Preset
        data.append("cloud_name", "dbrukcpr2");   // Aapka Cloud Name

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dbrukcpr2/image/upload", {
                method: "POST",
                body: data,
            });
            const fileData = await res.json();

            if (fileData.secure_url) {
                setPromo({ ...promo, bannerUrl: fileData.secure_url });
            }
        } catch (error) {
            alert("Image upload failed!");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSend = async () => {
        if (!window.confirm("Kya aap waqai sab subscribers ko email bhejna chahte hain?")) return;
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/subscribers/send-bulk-email`, promo);
            alert(res.data.message);
        } catch (err) {
            alert("Error: " + (err.response?.data?.error || "Kahin masla aa gaya."));
        }
        setLoading(false);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, color: 'white' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 900 }}>Create Promotion Email</Typography>

            <Grid container spacing={4}>
                {/* Inputs Left Side */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                        <TextField fullWidth label="Email Subject" margin="normal" focused
                            sx={{ input: { color: 'white' }, bgcolor: 'rgba(255,255,255,0.05)', mb: 2 }}
                            onChange={(e) => setPromo({ ...promo, subject: e.target.value })} value={promo.subject} />

                        <TextField fullWidth label="Banner Title" margin="normal" focused
                            sx={{ input: { color: 'white' }, bgcolor: 'rgba(255,255,255,0.05)', mb: 2 }}
                            onChange={(e) => setPromo({ ...promo, title: e.target.value })} value={promo.title} />

                        <TextField fullWidth multiline rows={3} label="Message Body" margin="normal" focused
                            sx={{ textarea: { color: 'white' }, bgcolor: 'rgba(255,255,255,0.05)', mb: 3 }}
                            onChange={(e) => setPromo({ ...promo, message: e.target.value })} value={promo.message} />

                        {/* --- Image Upload Button --- */}
                        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>Banner Image (Upload instead of Link)</Typography>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            startIcon={uploadingImage ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                            disabled={uploadingImage}
                            sx={{ color: '#f472b6', borderColor: '#f472b6', mb: 3, py: 1.5, '&:hover': { borderColor: '#e4529e', bgcolor: 'rgba(244, 114, 182, 0.05)' } }}
                        >
                            {uploadingImage ? "Uploading Image..." : "Select Banner Image"}
                            <input type="file" hidden onChange={handleImageUpload} />
                        </Button>

                        {/* Optional: Agar manually link bhi dalna ho to niche wala TextField rehne de sakte hain */}
                        {/* <TextField fullWidth label="Or Banner Image URL" margin="normal" focused 
                            onChange={(e) => setPromo({...promo, bannerUrl: e.target.value})} value={promo.bannerUrl} /> */}

                        <Button fullWidth variant="contained" size="large"
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                            disabled={loading || uploadingImage} onClick={handleSend}
                            sx={{ mt: 2, py: 2, bgcolor: '#9155FD', fontWeight: 'bold', fontSize: '1rem', '&:hover': { bgcolor: '#7a45d6' } }}>
                            {loading ? "Sending Emails..." : "Send to All Subscribers"}
                        </Button>
                    </Paper>
                </Grid>

                {/* Live Preview Right Side */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ color: '#94a3b8', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <VisibilityIcon /> Real-time Email Preview
                    </Typography>
                    <Box sx={{ bgcolor: 'white', borderRadius: '15px', overflow: 'hidden', color: 'black', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)' }}>
                        <Box sx={{ position: 'relative', height: '200px', bgcolor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {uploadingImage ? (
                                <CircularProgress />
                            ) : (
                                <img src={promo.bannerUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="banner" />
                            )}
                        </Box>
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="h5" sx={{ color: '#9155FD', fontWeight: 'bold', mb: 2 }}>{promo.title}</Typography>
                            <Typography sx={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>{promo.message}</Typography>
                            <Button variant="contained" sx={{ mt: 3, bgcolor: '#9155FD', borderRadius: '8px', px: 4 }}>Shop Now</Button>
                        </Box>
                    </Box>
                    <Typography variant="caption" sx={{ mt: 2, display: 'block', color: '#64748b', textAlign: 'center' }}>
                        * This is how the email will appear in the customer's inbox.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SendPromotion;