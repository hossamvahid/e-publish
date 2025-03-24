import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import UserTable from '../Components/UsersTable';
import AuthorsTable from '../Components/AuthorsTable';
import PendingsTable from '../Components/PendingsTable';


function Dashboard()
{
    return(
        <>
        <div className="min-h-screen"style={{ backgroundColor:'#B5A8D5'}}>
        <Box sx={{padding:3}} >

            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    padding: 2,
                }}
            >
                Dashboard
            </Typography>
            
            <UserTable></UserTable>

            <AuthorsTable></AuthorsTable>

            <PendingsTable></PendingsTable>
        </Box>

        </div>
         </>
    )
    
}

export default Dashboard