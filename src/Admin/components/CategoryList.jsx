import React, { useState, useEffect } from 'react';
import {
    Box, Grid, TextField, Button, Typography, Paper,
    FormControl, InputLabel, Select, MenuItem, CircularProgress,
    Accordion, AccordionSummary, AccordionDetails, IconButton, Avatar,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    DeleteForever as DeleteIcon,
    Edit as EditIcon,
    SubdirectoryArrowRight as SubIcon,
    PhotoCamera as PhotoIcon,
    CloudUpload as CloudUploadIcon,
    Save as SaveIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';
import axios from 'axios';
import { getNavigation } from '../../State/Category/Action';
import { useDispatch } from 'react-redux';

// NOTE: Apni API ka base URL yahan set karein agar alag file mein nahi hai to
const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

const CategoryList = () => {
    // --- States ---
    const [treeData, setTreeData] = useState([]);
    const [level1List, setLevel1List] = useState([]);
    const [level2List, setLevel2List] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    // Upload States
    const [uploading, setUploading] = useState({ logo: false, b1: false, b2: false });

    // Logo State
    const [logoUrl, setLogoUrl] = useState("");

    // Form States
    const [f1, setF1] = useState({ name: '' });
    const [f2, setF2] = useState({ name: '', parent: '' });
    const [f3, setF3] = useState({ name: '', topParent: '', parent: '' });

    // Banner States
    const [selectedTopId, setSelectedTopId] = useState('');
    const [banners, setBanners] = useState([{ title: '', image: '' }, { title: '', image: '' }]);

    // Edit Dialog State
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({ id: '', name: '' });

    // --- 1. Data Fetching (Logo + Categories) ---
    const fetchAllData = async () => {
        setLoading(true);
        try {
            // A. Fetch Categories Tree
            const res1 = await axios.get(`${API_BASE}/categories/list?level=1`);
            const l1 = res1.data;
            setLevel1List(l1);

            const fullTree = await Promise.all(l1.map(async (cat1) => {
                const res2 = await axios.get(`${API_BASE}/categories/list?level=2&parent=${cat1._id}`);
                const l2WithChildren = await Promise.all(res2.data.map(async (cat2) => {
                    const res3 = await axios.get(`${API_BASE}/categories/list?level=3&parent=${cat2._id}`);
                    return { ...cat2, children: res3.data };
                }));
                return { ...cat1, children: l2WithChildren };
            }));
            setTreeData(fullTree);

            // B. Fetch Current Logo (Backend endpoint hona chahiye)
            // Agar backend ready nahi, to filhal ye line comment rakhein
            const settingRes = await axios.get(`${API_BASE}/settings/get-logo`);
            if (settingRes.data && settingRes.data.logo) {
                setLogoUrl(settingRes.data.logo);
            }

        } catch (err) { console.error("Fetch error", err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchAllData(); }, []);

    // --- 2. Cloudinary Upload Logic ---
    const handleCloudinaryUpload = async (file, callback, loadKey) => {
        if (!file) return;
        setUploading(prev => ({ ...prev, [loadKey]: true }));

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ohmwws5g"); // Apna Preset Check karein
        data.append("cloud_name", "dbrukcpr2");   // Apna Cloud Name Check karein

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dbrukcpr2/image/upload", { method: "POST", body: data });
            const fileData = await res.json();
            if (fileData.secure_url) {
                callback(fileData.secure_url);
                alert("Image uploaded successfully to Cloudinary.");
            } else {
                alert("Cloudinary Error: Please check the console for more details.");
                console.log(fileData);
            }
        } catch (error) { alert("Image upload failed. Please try again."); console.error(error); }
        finally { setUploading(prev => ({ ...prev, [loadKey]: false })); }
    };

    // --- 3. Logo Functions ---
    // CategoryList.jsx ke andar handleSaveLogo function

    const handleSaveLogo = async () => {
        if (!logoUrl) return alert("Please select an image before saving.");
        try {
            await axios.post(`${API_BASE}/settings/update-logo`, { logo: logoUrl });
            alert("Logo has been saved successfully.");

            // 🛑 ZAROORI: Logo save hone ke baad categories aur logo dubara load karo
            fetchAllData();
            dispatch(getNavigation());

        } catch (err) { alert("Failed to save the logo. Please try again."); }
    };

    const handleDeleteLogo = async () => {
        if (window.confirm("Are you sure you want to delete the Site Logo?")) {
            setLogoUrl(""); // UI se hataya
            try {
                await axios.post(`${API_BASE}/settings/update-logo`, { logo: "" }); // Backend se hataya
                alert("Logo has been deleted successfully.");
            } catch (err) { alert("Failed to delete the logo."); }
        }
    };

    // --- 4. Category & Banner Functions ---
    const submitCategory = async (data, level, parentId, resetFn) => {
        if (!data.name) return alert("Category name is required.");
        setLoading(true);
        try {
            await axios.post(`${API_BASE}/categories/add`, { name: data.name, level, parent: parentId });
            alert("Category has been added successfully.");
            fetchAllData(); resetFn();
        } catch (err) { alert("Error: Could not add the category."); }
        setLoading(false);
    };

    const handleDeleteCategory = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete "${name}" and all its sub-categories? This action cannot be undone.`)) {
            try {
                await axios.delete(`${API_BASE}/categories/${id}`);
                alert(`Category "${name}" has been deleted successfully.`);
                fetchAllData();
            } catch (err) { alert("Error: The category could not be deleted."); }
        }
    };

    const handleUpdateBanners = async () => {
        if (!selectedTopId) return alert("Please select a category before updating banners.");
        try {
            // Filter empty banners
            const validBanners = banners.filter(b => b.title || b.image);
            await axios.put(`${API_BASE}/categories/update-banners`, { id: selectedTopId, featured: validBanners });
            alert("Banners have been updated successfully.");
            fetchAllData();
            setBanners([{ title: '', image: '' }, { title: '', image: '' }]); // Reset form
        } catch (err) { alert("Error: Could not update the banners."); }
    };

    const deleteBannerPermanently = async (catId, bannerIndex) => {
        if (!window.confirm("Delete this banner permanently?")) return;
        try {
            const category = treeData.find(c => c._id === catId);
            const updatedFeatured = category.featured.filter((_, i) => i !== bannerIndex);
            await axios.put(`${API_BASE}/categories/update-banners`, { id: catId, featured: updatedFeatured });
            alert("Banner Deleted!");
            fetchAllData();
        } catch (err) { alert("Error deleting banner"); }
    };

    // --- Edit Functions ---
    const handleEditClick = (e, cat) => {
        e.stopPropagation();
        setEditData({ id: cat._id, name: cat.name });
        setOpenEdit(true);
    };

    const handleUpdateCategory = async () => {
        try {
            await axios.put(`${API_BASE}/categories/${editData.id}`, { name: editData.name });
            alert("Category has been updated successfully.");
            setOpenEdit(false);
            fetchAllData();
        } catch (err) { alert("Error: Could not update the category."); }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#0f172a', minHeight: '100vh', color: 'white' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 900, textAlign: 'center', color: '#f8fafc' }}>
                ⚙️ ADMIN DASHBOARD
            </Typography>

            {/* ================================================= */}
            {/* 1. SITE LOGO MANAGER (SAB SE UPAR) */}
            {/* ================================================= */}
            <Paper elevation={10} sx={{ p: 4, mb: 6, bgcolor: '#1e293b', borderTop: '6px solid #3b82f6', borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <PhotoIcon sx={{ color: '#3b82f6', fontSize: 40 }} />
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>Site Branding</Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>Upload website main logo (Visible in Navbar)</Typography>
                    </Box>
                </Box>

                <Grid container spacing={4} alignItems="center">
                    {/* Logo Preview Area */}
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ position: 'relative', p: 1, border: '2px dashed #475569', borderRadius: 2, bgcolor: '#0f172a' }}>
                            {logoUrl ? (
                                <>
                                    <img src={logoUrl} alt="Site Logo" style={{ height: '80px', maxWidth: '100%', objectFit: 'contain' }} />
                                    <IconButton
                                        onClick={handleDeleteLogo}
                                        sx={{ position: 'absolute', top: -15, right: -15, bgcolor: '#ef4444', color: 'white', '&:hover': { bgcolor: '#dc2626' } }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <Typography sx={{ color: '#64748b', p: 4 }}>No Logo Uploaded</Typography>
                            )}
                        </Box>
                    </Grid>

                    {/* Logo Controls */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={uploading.logo ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                                sx={{ color: '#3b82f6', borderColor: '#3b82f6', py: 1.5, px: 4 }}
                            >
                                {uploading.logo ? "Uploading..." : "Select New Logo"}
                                <input type="file" hidden onChange={(e) => handleCloudinaryUpload(e.target.files[0], setLogoUrl, 'logo')} />
                            </Button>

                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={handleSaveLogo}
                                disabled={!logoUrl}
                                sx={{ bgcolor: '#3b82f6', py: 1.5, px: 4, fontWeight: 'bold' }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#64748b' }}>
                            * Recommended Size: 200x60px (PNG/Transparent)
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* ================================================= */}
            {/* 2. CATEGORY CREATION FORMS */}
            {/* ================================================= */}
            <Grid container spacing={4}>
                {/* Level 1 Form */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #7c3aed', height: '100%' }}>
                        <Typography variant="h6" color="#a78bfa" gutterBottom>Add Level 1 (Top)</Typography>
                        <TextField fullWidth size="small" placeholder="Ex: Men, Women" value={f1.name} onChange={e => setF1({ ...f1, name: e.target.value })} sx={{ input: { color: 'white' }, bgcolor: '#334155', borderRadius: 1, mb: 2 }} />
                        <Button fullWidth variant="contained" sx={{ bgcolor: '#7c3aed' }} onClick={() => submitCategory(f1, 1, null, () => setF1({ name: '' }))}>Add Level 1</Button>
                    </Paper>
                </Grid>

                {/* Level 2 Form */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #2563eb', height: '100%' }}>
                        <Typography variant="h6" color="#60a5fa" gutterBottom>Add Level 2 (Sub)</Typography>
                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                            <InputLabel sx={{ color: '#94a3b8' }}>Parent Category</InputLabel>
                            <Select value={f2.parent} onChange={e => setF2({ ...f2, parent: e.target.value })} sx={{ color: 'white', bgcolor: '#334155' }}>
                                {level1List.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <TextField fullWidth size="small" placeholder="Ex: Clothing, Shoes" value={f2.name} onChange={e => setF2({ ...f2, name: e.target.value })} sx={{ input: { color: 'white' }, bgcolor: '#334155', borderRadius: 1, mb: 2 }} />
                        <Button fullWidth variant="contained" sx={{ bgcolor: '#2563eb' }} onClick={() => submitCategory(f2, 2, f2.parent, () => setF2({ name: '', parent: '' }))}>Add Level 2</Button>
                    </Paper>
                </Grid>

                {/* Level 3 Form */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #059669', height: '100%' }}>
                        <Typography variant="h6" color="#34d399" gutterBottom>Add Level 3 (Item)</Typography>
                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                            <InputLabel sx={{ color: '#94a3b8' }}>Select Top Parent</InputLabel>
                            <Select value={f3.topParent} onChange={async (e) => {
                                setF3({ ...f3, topParent: e.target.value, parent: '' });
                                const res = await axios.get(`${API_BASE}/categories/list?level=2&parent=${e.target.value}`);
                                setLevel2List(res.data);
                            }} sx={{ color: 'white', bgcolor: '#334155' }}>
                                {level1List.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small" sx={{ mb: 2 }} disabled={!level2List.length}>
                            <InputLabel sx={{ color: '#94a3b8' }}>Select Sub Parent</InputLabel>
                            <Select value={f3.parent} onChange={e => setF3({ ...f3, parent: e.target.value })} sx={{ color: 'white', bgcolor: '#334155' }}>
                                {level2List.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <TextField fullWidth size="small" placeholder="Ex: T-Shirts, Jeans" value={f3.name} onChange={e => setF3({ ...f3, name: e.target.value })} sx={{ input: { color: 'white' }, bgcolor: '#334155', borderRadius: 1, mb: 2 }} />
                        <Button fullWidth variant="contained" sx={{ bgcolor: '#059669' }} onClick={() => submitCategory(f3, 3, f3.parent, () => setF3({ name: '', topParent: '', parent: '' }))}>Add Level 3</Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* ================================================= */}
            {/* 3. BANNER MANAGEMENT (UPLOAD & DELETE) */}
            {/* ================================================= */}
            <Paper sx={{ mt: 6, p: 4, bgcolor: '#1e293b', border: '2px solid #f472b6', borderRadius: 3 }}>
                <Typography variant="h5" color="#f472b6" sx={{ mb: 3, fontWeight: 'bold' }}>🖼️ Mega Menu Banners</Typography>

                {/* A. Upload Section */}
                <Box sx={{ p: 2, border: '1px dashed #475569', borderRadius: 2, mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ color: '#cbd5e1', mb: 2 }}>Upload New Banners</Typography>
                    <Grid container spacing={3} alignItems="flex-end">
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth focused size="small">
                                <InputLabel sx={{ color: 'white' }}>Select Category</InputLabel>
                                <Select value={selectedTopId} onChange={e => setSelectedTopId(e.target.value)} sx={{ color: 'white', bgcolor: '#334155' }}>
                                    {level1List.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        {[0, 1].map((i) => (
                            <Grid item xs={12} md={3} key={i}>
                                <TextField fullWidth label={`Banner ${i + 1} Title`} size="small" value={banners[i].title} onChange={e => { const nb = [...banners]; nb[i].title = e.target.value; setBanners(nb); }} sx={{ mb: 1, input: { color: 'white' }, bgcolor: '#334155', borderRadius: 1 }} />
                                <Button component="label" fullWidth variant="outlined" size="small" sx={{ color: 'white', borderColor: '#64748b' }}>
                                    {uploading[`b${i + 1}`] ? <CircularProgress size={16} /> : (banners[i].image ? "Image Selected ✅" : "Upload Image")}
                                    <input type="file" hidden onChange={e => handleCloudinaryUpload(e.target.files[0], (url) => { const nb = [...banners]; nb[i].image = url; setBanners(nb); }, `b${i + 1}`)} />
                                </Button>
                            </Grid>
                        ))}
                        <Grid item xs={12} md={2}>
                            <Button variant="contained" fullWidth sx={{ bgcolor: '#f472b6', height: '40px' }} onClick={handleUpdateBanners}>Save Banners</Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* B. Active Banners List (For Deleting) */}
                <Typography variant="subtitle1" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>Active Banners List:</Typography>
                <Grid container spacing={2}>
                    {treeData.filter(c => c.featured && c.featured.length > 0).map((cat) => (
                        <Grid item xs={12} md={6} key={cat._id}>
                            <Paper sx={{ p: 2, bgcolor: '#0f172a', borderLeft: '4px solid #f472b6' }}>
                                <Typography variant="body2" sx={{ color: '#f472b6', fontWeight: 'bold', mb: 1 }}>{cat.name.toUpperCase()}</Typography>
                                {cat.featured.map((ban, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, p: 1, bgcolor: '#1e293b', borderRadius: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar src={ban.image} variant="rounded" />
                                            <Typography variant="caption" color="white">{ban.title || "No Title"}</Typography>
                                        </Box>
                                        <IconButton component="div" size="small" color="error" onClick={() => deleteBannerPermanently(cat._id, idx)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Paper>
                        </Grid>
                    ))}
                    {treeData.filter(c => c.featured && c.featured.length > 0).length === 0 && (
                        <Typography sx={{ color: '#64748b', fontStyle: 'italic', ml: 2 }}>No active banners found.</Typography>
                    )}
                </Grid>
            </Paper>

            {/* ================================================= */}
            {/* 4. HIERARCHY CHART (VIEW & DELETE CATEGORIES) */}
            {/* ================================================= */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#94a3b8', textAlign: 'center' }}>📊 CATEGORY TREE</Typography>
                {treeData.map((l1) => (
                    <Accordion key={l1._id} sx={{ bgcolor: '#1e293b', color: 'white', mb: 1, borderLeft: '6px solid #7c3aed' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', pr: 2 }}>
                                <Typography sx={{ fontWeight: 'bold' }}>{l1.name.toUpperCase()}</Typography>
                                <Box>
                                    <IconButton onClick={(e) => handleEditClick(e, l1)} sx={{ color: '#3b82f6', mr: 1 }}><EditIcon /></IconButton>
                                    <IconButton component="div" onClick={(e) => { e.stopPropagation(); handleDeleteCategory(l1._id, l1.name); }} color="error"><DeleteIcon /></IconButton>
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: '#0f172a' }}>
                            {l1.children?.map((l2) => (
                                <Accordion key={l2._id} sx={{ bgcolor: '#334155', color: 'white', mb: 1, borderLeft: '4px solid #2563eb' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', pr: 2 }}>
                                            <Typography><SubIcon fontSize="small" /> {l2.name}</Typography>
                                            <Box>
                                                <IconButton onClick={(e) => handleEditClick(e, l2)} size="small" sx={{ color: '#3b82f6', mr: 1 }}><EditIcon fontSize="small" /></IconButton>
                                                <IconButton component="div" onClick={(e) => { e.stopPropagation(); handleDeleteCategory(l2._id, l2.name); }} size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                                            </Box>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {l2.children?.map((l3) => (
                                            <Box key={l3._id} sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #475569' }}>
                                                <Typography sx={{ fontSize: '0.9rem', color: '#cbd5e1' }}>• {l3.name}</Typography>
                                                <Box>
                                                    <IconButton onClick={(e) => handleEditClick(e, l3)} size="small" sx={{ color: '#3b82f6', mr: 1 }}><EditIcon fontSize="small" /></IconButton>
                                                    <IconButton onClick={() => handleDeleteCategory(l3._id, l3.name)} size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                                                </Box>
                                            </Box>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle>Edit Category Name</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Category Name" fullWidth value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button onClick={handleUpdateCategory} variant="contained">Update</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default CategoryList;