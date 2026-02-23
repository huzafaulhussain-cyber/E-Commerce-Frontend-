import { Grid, TextField, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser, register } from '../State/Auth/Action'
const RegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const jwt = localStorage.getItem('jwt')
    const { auth } = useSelector((state) => state)

    useEffect(() => {
        if (jwt || auth.jwt) {
            dispatch(getUser())
        }

    }, [jwt, auth.jwt])

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)
        const userData = {
            firstName: data.get('firstname'),
            lastName: data.get('lastname'),
            email: data.get('email'),
            password: data.get('password'),
        }
        console.log('userData', userData)

        dispatch(register(userData))

    }

    return (
        <div>
            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Create Account
            </Typography>
            <form onSubmit={handleSubmit}>

                <Grid item xs={12} >
                    <TextField
                        required
                        id='firstname'
                        label='First Name'
                        name='firstname'
                        variant='outlined'
                        fullWidth
                        sx={{ mt: 2 }}
                        autoComplete='given-name'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id='lastname'
                        label='Last Name'
                        name='lastname'
                        variant='outlined'
                        fullWidth
                        sx={{ mt: 2 }}
                        autoComplete='given-name'
                    />
                </Grid>


                <Grid item xs={12}>
                    <TextField
                        required
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        autoComplete="email"
                        sx={{ mt: 2 }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        autoComplete="new-password"
                        sx={{ mt: 2 }}
                    />
                </Grid>

                <Grid item xs={12} >
                    <Button
                        type='submit'
                        className='w-full cursor-pointer bg-[#248041] px-4 py-2 mt-3 text-white rounded-md'
                        variant='contained'
                        fullWidth
                        sx={{ mt: 4, bgcolor: '#248041', py: 1.5, '&:hover': { bgcolor: '#1b6332' } }}
                    >
                        Register
                    </Button>
                </Grid>

            </form>

            <div className='flex flex-col justify-center items-center'>
                <div className='flex py-3 items-center'>
                    <p>Already have an account?</p>
                    <Button className='  ml-3 cursor-pointer' sx={{ color: '#248041', fontWeight: 'bold' }} onClick={() => { navigate('/login') }} > Login</Button>
                </div>
            </div>

        </div>
    )
}

export default RegisterForm
