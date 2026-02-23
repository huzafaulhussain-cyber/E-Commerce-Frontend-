import Box from '@mui/material/Box';
import LoginForm from './LoginForm';
import { useLocation } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import RegisterForm from './RegisterForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // ✅ Responsive Width: Mobile par 90% aur desktop par 500px tak jayega
    width: { xs: "90%", sm: "500px" }, 
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: { xs: 2, sm: 4 }, // Mobile par padding kam kar di
    borderRadius: "12px", // Thora modern look
    maxHeight: "97vh", // Boht chote phone par scroll lag jayega
    // overflowY: "auto"
};

export default function AuthModel({ open, handleClose }) {
    const local = useLocation();
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {local.pathname === '/register' 
                        ? <RegisterForm handleClose={handleClose}/> 
                        : <LoginForm handleClose={handleClose}/>}
                </Box>
            </Modal>
        </div>
    );
}