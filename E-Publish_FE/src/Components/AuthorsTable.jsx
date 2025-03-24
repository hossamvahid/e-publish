import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";



const AuthorsTable = () => {
  const { getToken } = useAuth();
  const token = getToken();
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(()=>{

    const fetchUsers= async(pageNumber) =>{
    
        try{
            const respone = await axios.get(
                 `${import.meta.env.VITE_API_URL}/api/v1/admin/authors?page=${pageNumber}`,
                 {
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                 }
            );

           setAuthors(respone.data.content);
           setTotalPage(respone.data.totalPages);
           setCurrentPage(respone.data.pageable.pageNumber + 1);
        }
        catch(error)
        {
            console.error("Error at fetching the users: "+error);
        }
    };
    fetchUsers(currentPage);

  },[token,currentPage]);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "contained" : "outlined"}
          color={i === currentPage ? "secondary" : "default"}
          onClick={() => setCurrentPage(i)}
          sx={{
            margin: "0 5px",
          }}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  const handleDelete=async(authorId) =>{

    try{
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/v1/admin/remove?id=${authorId}`,
          {
            headers:{
                Authorization:`Bearer ${token}`
            },
         }
        );
        window.location.reload();
    }catch(error)
    {
      console.error("Error at deleting the user: "+error);
    }

  };

  const handleRemove=async(authorId) =>{

    try{
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/v1/admin/user?id=${authorId}`,
          {},
          {
            headers:{
                Authorization:`Bearer ${token}`
            },
         }
        );
        window.location.reload();
    }catch(error)
    {
      console.error("Error at removing the author role: "+error);
    }
  };
  return (
        <>
        <Box sx={{ padding: 3, color: "white" }}>
        <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: 5,
        }}
      >
        Authors
      </Typography>

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell  sx={{   borderBottom: "none",color: "white"}}>
                            Name
                        </TableCell>

                        <TableCell  sx={{   borderBottom: "none",color: "white"}}>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {authors.map((author)=>
                        <TableRow key={author.id}>
                            
                            <TableCell sx={{borderBottom:"none", color:"white"}}>
                                {author.username}
                            </TableCell>

                            <TableCell sx={{borderBottom:"none", color:"white"}}>
                                 <Box sx={{display:"flex",gap:1}}>
                                 <Button variant="contained" color="error" onClick={()=>handleRemove(author.id)}>
                                    Remove
                                </Button>

                                <Button variant="contained" color="error" onClick={()=>handleDelete(author.id)}>
                                    Delete
                                </Button>
                                </Box>
                            </TableCell>

                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </TableContainer>

        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        {renderPageNumbers()}
      </Box>
        </Box>
        </>
    )
}
export default AuthorsTable;