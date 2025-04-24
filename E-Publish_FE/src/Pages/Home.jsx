import { Container, Box, TextField, Button, Typography } from '@mui/material';
function Home()
{
    return(
        <>
        
         <Container
              maxWidth="md" 
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
                }}>
                    <Typography variant="h6" align="center" gutterBottom sx={{color:'white'}}>

                                    Welcome to E-Publish, Our goal is that authors to have a place where they can publish their books.<br></br> We are here to support small authors who dont have a place where to show their books.
                    </Typography>
              </Box>
                
            </Container>
        </>
    )
    
}

export default Home