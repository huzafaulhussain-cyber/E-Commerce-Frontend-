// import { Button, Grid, TextField } from '@mui/material'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import { login, getUser } from '../State/Auth/Action'
// const LoginForm = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const jwt = localStorage.getItem('jwt')
//   const { auth } = useSelector((state) => state)

//   useEffect(() => {
//     if (jwt || auth.jwt) {
//       dispatch(getUser())
//     }
//   }, [jwt, auth.jwt])

  
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const data = new FormData(e.currentTarget)
//     const userData = {
//       email: data.get('email'),
//       password: data.get('password'),
//     }
//     console.log('userData', userData)

//     // 👇 Navigate pass karo taake action redirect kar sakay
//     dispatch(login(userData, navigate))
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Grid item xs={12}>
//           <TextField
//             required
//             label="Email"
//             name="email"
//             type="email"
//             fullWidth
//             autoComplete="email"
//             sx={{ mt: 2 }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             required
//             label="Password"
//             name="password"
//             type="password"
//             fullWidth
//             autoComplete="new-password"
//             sx={{ mt: 2 }}
//           />
//         </Grid>

//         <Grid item xs={12} >
//           <Button
//             type='submit'
//             className='w-full cursor-pointer bg-[#9155FD] px-4 py-2 mt-3 text-white rounded-md'
//             variant='contained'
//             fullWidth
//             sx={{ mt: 2 }} color='primary'
//           >
//             Login
//           </Button>
//         </Grid>

//       </form>
//       <div className='flex flex-col justify-center items-center'>
//         <div className='flex py-3 items-center'>
//           <p> Don't have an account?</p>
//           <Button className='text-[#9155FD] ml-3 cursor-pointer' onClick={() => { navigate('/register') }} > Register</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LoginForm

import { Button, Box, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../State/Auth/Action'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    dispatch(login(userData, navigate))
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
          <TextField
            required
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            required
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            size="large"
            sx={{ mt: 4, bgcolor: '#248041', py: 1.5, '&:hover': { bgcolor: '#1b6332' } }}
         
           >
            Login
          </Button>
          
      </form>
      <Box sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'center', alignItems: 'center', mt: 3, gap: 1 }}>
          <Typography variant="body2">Don't have an account?</Typography>
          <Button 
            size="small"
            sx={{ color: '#248041', fontWeight: 'bold' }} 
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
      </Box>
    </Box>
  )
}

export default LoginForm