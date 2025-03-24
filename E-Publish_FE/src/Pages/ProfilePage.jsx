import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from "../hooks/useAuth";
import { fetchUsername } from '../utils/fetchUsername';
import axios from "axios";
import { fetchUserRole } from '../utils/fetchUserRole';

function ProfilePage()
{
      const [username,setUsername]=useState("");
      const {getToken} = useAuth();
      const [password,setPassword]=useState("");
      const [confirm,setConfirm]=useState("");
      const [role,setRole]=useState(null);


    useEffect(()=> {
            const token=getToken();

            const fetchName= async()=>
            {
                const token = getToken();

                try{
                    const userName=await fetchUsername(token);

                    setUsername(userName);
                }
                catch(error)
                {
                    console.error("Failed to fetch username "+error);
                }

            }

            const fetchRole=async()=>
            {
                try{
                    const userRole= await fetchUserRole(token);
                    setRole(userRole);
                }
                catch(error)
                {
                    console.error("Failed to fetch role "+error);
                }
            }



        fetchName();
        fetchRole();
    },[getToken])

    const handleChangePassword= async(e)=>
    {
        if (password !== confirm) {
            alert("Parolele nu sunt identice!"); 
            return;
        }

        const token=getToken();
        const newPassword=password;
        try{
        const response= await axios.put(
            `${import.meta.env.VITE_API_URL}/api/v1/user/change`,
            {
                newPassword,
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
          
        }
        catch(error)
        {
            console.error("Failed to change password " + error);

        }

    }

    const handleStatus=async(e)=>
    {
        const token=getToken();
        try{
            const respone=await axios.put(
                 `${import.meta.env.VITE_API_URL}/api/v1/user/request`,
                {},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            ); 
        }
        catch(error)
        {
            console.error("Failed to update the status "+error);
        }
        window.location.reload();   
    }

    return(
        <>
       <Container
             maxWidth="md" 
             sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: '100vh', 
                paddingTop:'25vh'
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
                <Typography variant="h4" sx={{ color: '#fff' , textAlign:'center', marginBottom:5}}>
                    Hello, {username}
                </Typography>

            <div>
                <Typography variant="h6" sx={{color:'#fff'}}>
                    Change Passowrd
                </Typography>

            <form onSubmit={handleChangePassword}>
                
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent:'', 
                            gap: 2, 
                        }}
                    >
                        <TextField
                            label="New Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            sx={{
                                flex: 1, 
                                maxWidth: 200, 
                            }}
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            
                        />

                        <TextField
                            label="Confirm New Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            sx={{
                                flex: 1, 
                                maxWidth: 200, 
                            }}
                            value={confirm}
                            onChange={(e)=> setConfirm(e.target.value)}
                        />

                    </Box>

                 
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="secondary"
                        sx={{
                            marginTop: 2,
                            height: 50, 
                            maxWidth:400,
                            marginBottom:10
                        }}
                    >
                        Submit
                    </Button>
                </form>
            </div>

           

                {role==="Pending"&&(
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                  Your request is on pending
              </Typography>
                )}

                {role==="Author"&&(
                    <Typography variant="h6" sx={{color:'#fff'}}>
                        You are an Author
                    </Typography>
                )}

                {role==="User"&&(
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 3 }}>

               <Typography variant="h6" sx={{ color: '#fff' }}>
                   Request for Author?
                </Typography>

                <Button variant="contained" color="secondary" onClick={handleStatus}>
                   Request
                </Button>
                
                </Box>   
                )}
                
        </Box>

     </Container>   
     
     </>
    )
    
}

export default ProfilePage;