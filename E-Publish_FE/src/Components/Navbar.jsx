import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchUserRole } from "../utils/fetchUserRole";

const Navbar=()=>
{
    const {getToken} = useAuth();
    const [role,setRole]=useState(null);
    const navigate = useNavigate();

    useEffect(()=>{

        const fetchRole= async()=>{
            const token=getToken();
            
            if(token)
            {
                try{
                    const userRole = await fetchUserRole(token);

                    if(!userRole)
                    {
                        localStorage.removeItem("authToken");
                        setRole("");
                        navigate("/login");
                    }
                    else
                    {
                        setRole(userRole);
                    }
                }
                catch(error)
                {
                    console.error("Error fetching user role: ",error);
                    localStorage.removeItem("authToken");
                    setRole("");
                    navigate("/login");
                }
               
            }
            else
            {
                setRole("");
            }
          
        };
    

     fetchRole();

    },[getToken,navigate]);

    const logOut=()=>
    {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    const handleRedicrectClick = (where) => {
        navigate(where); // Navigate to the path provided
      };
    return(
         <>
         <header>
            <AppBar>
                <Toolbar className="flex justify-between items-center px-4"
                sx={{
                    backgroundColor:'#B5A8D5'
                }}>

                    <p>Aici logo</p>

                    <div className="flex space-x-6">
                        <Button
                        sx={{
                            color:"white",
                            backgroundColor:"transparent"
                        }}
                        onClick={()=>handleRedicrectClick("/")}>
                            Home
                        </Button>
                    </div>

                  {role === ""&&(
                     <div className="flex space-x-11">
                     <Button
                      sx={{
                         color:"white",
                         backgroundColor:"transparent"
                     }} 
                      onClick={()=>handleRedicrectClick("/login")}>
                         Sign In
                     </Button>
 
                     <Button
                     sx={{
                         color:"white",
                         backgroundColor:"transparent"
                     }}
                     onClick={()=>handleRedicrectClick("/register")}>
                         Sign Up
                     </Button>
 
                     </div>
                  )}  

                  {role !== "" &&
                  (
                    <div className="flex space-x-11">
                        {role !=="Admin"&&(
                             <Button
                             sx={{
                                 color:"white",
                                 backgroundColor:"transparent"
                             }}
                             onClick={()=> handleRedicrectClick("/profile")}
                             >

                                 Profile
                             </Button>
                        )}

                        {role==="Admin"&&(
                        <Button
                        sx={{
                            color:"white",
                            backgroundColor:"transparent"
                        }}
                        onClick={()=> handleRedicrectClick("/dashboard")}
                        >

                            Dashboard
                        </Button>
                        )}

                        <Button
                          sx={{
                            color:"white",
                            backgroundColor:"transparent"
                        }}
                        onClick={()=>logOut()}>

                            Sign Out
                        </Button>


                    </div>
                  )}

                </Toolbar>
            </AppBar>
         </header>
        </>
    );
};

export default Navbar;