import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage()
{

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [error, setError] = useState(null);
  const navigate=useNavigate(null);

  const handleSumbit = async(e)=>
  {
    e.preventDefault();
    setError(null);
    try
    {
      const response = await axios.post(
         `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
         {
          username,
          password,
         }
      )
   
      const token = response.data.access_token;
      localStorage.setItem("authToken",token);
      navigate("/");
    }
    catch(err)
    {
      setError("Invalid username or password");
      console.error("Login failed: ",err);
    }
  }


    return(
        <>
        <Container
      maxWidth="xs" 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', 
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: 3,
          boxShadow: 3, 
          borderRadius: 5,
          backgroundColor:'#B5A8D5'
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{color:'white'}}>
          Sign In
        </Typography>

        <form onSubmit={handleSumbit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="secondary"
            sx={{ marginTop: 2 }}
          >
            Sumbit
          </Button>
        </form>
      </Box>
    </Container>
        </>
    )
    
}

export default LoginPage