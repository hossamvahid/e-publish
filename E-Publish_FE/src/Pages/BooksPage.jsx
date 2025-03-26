import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import BooksTable from '../Components/BooksTable';



function BooksPage()
{
    return(
        <>
            <div className="min-h-screen" style={{backgroundColor:'#B5A8D5'}}>
                <BooksTable></BooksTable>
            </div>
        </>
    )
    
}

export default BooksPage