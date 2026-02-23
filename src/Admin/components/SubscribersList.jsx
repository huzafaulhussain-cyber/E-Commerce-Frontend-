import React, { useEffect, useState } from 'react';
import { 
    Box, Card, CardHeader, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, 
    CircularProgress, IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Delete icon import kiya
import axios from 'axios';

const SubscribersList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Data load karne ka function
    const fetchSubs = () => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/api/subscribers`)
            .then(res => {
                setSubs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchSubs();
    }, []);

     const handleDelete = async (id) => {
        if (window.confirm("Kya aap waqai is email ko delete karna chahte hain?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/subscribers/${id}`);
                // State se foran hata do taake page refresh na karna paray
                setSubs(subs.filter(sub => sub._id !== id));
            } catch (err) {
                alert("Delete karne mein masla aaya!");
            }
        }
    };

    if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;

    return (
        <Box sx={{ minHeight: '100vh', p: { xs: 1, md: 5 } }}>
            <Card sx={{ bgcolor: '#1e293b', color: 'white', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <CardHeader title={`Newsletter Subscribers (${subs.length})`} titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }} />
                <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
                                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>#</TableCell>
                                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Email Address</TableCell>
                                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Date Joined</TableCell>
                                <TableCell align="center" sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subs.length > 0 ? (
                                subs.map((sub, index) => (
                                    <TableRow key={sub._id} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                                        <TableCell sx={{ color: 'white' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{sub.email}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell align="center">
                                            <IconButton 
                                                onClick={() => handleDelete(sub._id)} 
                                                sx={{ color: '#ef4444', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ color: '#94a3b8', py: 5 }}>
                                        Koi subscriber nahi mila.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default SubscribersList;