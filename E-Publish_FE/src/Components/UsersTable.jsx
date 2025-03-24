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



const UserTable = () => {
  const { getToken } = useAuth();
  const token = getToken();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(()=>{

    const fetchUsers= async(pageNumber) =>{
    
        try{
            const respone = await axios.get(
                 `${import.meta.env.VITE_API_URL}/api/v1/admin/users?page=${pageNumber}`,
                 {
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                 }
            );

           setUsers(respone.data.content);
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

  const handleDelete=async(userId) =>{

    try{
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/v1/admin/remove?id=${userId}`,
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
        Users
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
                    {users.map((user)=>
                        <TableRow key={user.id}>
                            
                            <TableCell sx={{borderBottom:"none", color:"white"}}>
                                {user.username}
                            </TableCell>

                            <TableCell sx={{borderBottom:"none", color:"white"}}>
                                <Button variant="contained" color="error" onClick={()=>handleDelete(user.id)}>
                                    Delete
                                </Button>
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
export default UserTable;