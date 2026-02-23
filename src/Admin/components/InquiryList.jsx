import React, { useEffect, useState } from 'react';
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Tooltip, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const InquiryList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/contacts`);
            setMessages(res.data);
        } catch (err) {
            console.log("Error fetching messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    // 1. Delete Logic
    const handleDelete = async (id) => {
        if (window.confirm("Delete this message?")) {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/contacts/${id}`);
            setMessages(messages.filter(m => m._id !== id));
        }
    };

    const handleStatusUpdate = async (id) => {
        alert("Marked as Read/Resolved!");
    };

    if (loading) return <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5 }} />;

    return (
        <Box sx={{ p: { xs: 1, md: 5 }, height: '100vh' }}>
            <Card sx={{ bgcolor: '#1e293b', color: 'white', borderRadius: '16px' }}>
                <CardHeader title="Customer Inquiries" subheader="Messages from Contact Us page" subheaderTypographyProps={{ color: '#94a3b8' }} />
                <TableContainer component={Paper} sx={{ bgcolor: 'transparent' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
                                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Customer</TableCell>
                                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Subject</TableCell>
                                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Message Snippet</TableCell>
                                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell align="center" sx={{ color: '#94a3b8', fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {messages.map((m) => (
                                <TableRow key={m._id} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                                    <TableCell sx={{ color: 'white' }}>
                                        <div className='font-bold'>{m.fullName}</div>
                                        <div className='text-xs text-gray-400'>{m.email}</div>
                                    </TableCell>
                                    <TableCell sx={{ color: '#f472b6', fontWeight: 500 }}>{m.subject}</TableCell>
                                    <TableCell sx={{ color: '#cbd5e1', maxWidth: '250px' }}>
                                        <Tooltip title={m.message}>
                                            <span className='truncate block cursor-pointer'>{m.message}</span>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '0.8rem' }}>{new Date(m.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={m.status}
                                            size="small"
                                            color={m.status === "Pending" ? "warning" : "success"}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                            <IconButton onClick={() => handleStatusUpdate(m._id)} sx={{ color: '#22c55e' }}>
                                                <CheckCircleIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(m._id)} sx={{ color: '#ef4444' }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default InquiryList;