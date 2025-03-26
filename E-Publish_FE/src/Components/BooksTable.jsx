import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Button,
    Box,
    Typography,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { fetchUsername } from "../utils/fetchUsername";
import { fetchUserRole } from "../utils/fetchUserRole";

const BooksTable = () => {
  const { getToken } = useAuth();
  const token = getToken();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [partTitle, setPartTitle] = useState("None");
  const [genre, setGenre] = useState("None");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedBook, setSelectedBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [openCreateDialog,setOpenCreateDialog]=useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    genre: "",
    description: "",
    file:null
  });


  const [username, setUsername] = useState(null);
  const [userRole,setRole]=useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/book/get?page=${currentPage}&partTitle=${partTitle}&genre=${genre}`
        );

        setBooks(response.data.content);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    const fetchUser=async()=>{
        if(token !== null)
        {
        const name = await fetchUsername(token);
        setUsername(name);
        }
    };

    const fetchRole =async()=>{
        if(token !== null)
        {
            const role = await fetchUserRole(token);
            setRole(role);
        }
    };

    fetchRole();
    fetchUser();
    fetchBooks();
  }, [currentPage, partTitle, genre,token]);

  const handleDownload = async () => {
    if (!selectedBook) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/book/download?id=${selectedBook.id}`,
        {
          responseType: "blob",
        }
      );


      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${selectedBook.title}.pdf`); 
      document.body.appendChild(link);
      link.click();

 
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file: ", error);
    }
  };

  const handleCreateBook = async () => {
   
   
    try {
      const formData = new FormData();
      formData.append("title", newBook.title);
      formData.append("genre", newBook.genre);
      formData.append("description", newBook.description);
      if (newBook.file) {
        formData.append("file", newBook.file);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/book/create`,
        formData,
        { 
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setOpenCreateDialog(false);
      window.location.reload();
    }
    catch(error)
    {
        console.error("Error at creating the book : "+error);
    }
}

  const handleDelete=async (bookId)=>{

    try{
    const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/book/delete?id=${bookId}`,
        { 
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      );
      window.location.reload();
    }
    catch(error)
    {
        console.error("Error at deleting: "+error);
    }

  }


  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setPartTitle(searchQuery.trim() === "" ? "None" : searchQuery.trim());
      setCurrentPage(1); 
    }
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
    setCurrentPage(1); 
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPage }, (_, i) => (
      <Button
        key={i + 1}
        variant={i + 1 === currentPage ? "contained" : "outlined"}
        color={i + 1 === currentPage ? "secondary" : "primary"}
        onClick={() => setCurrentPage(i + 1)}
        sx={{ margin: "0 5px" }}
      >
        {i + 1}
      </Button>
    ));
  };


  const handleViewBook = (book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 3,
        color: "white",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 5, textAlign: "center" }}>
        Books
      </Typography>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <TextField
          label="Search by title"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearch}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Genre</InputLabel>
          <Select value={genre} onChange={handleGenreChange}>
            <MenuItem value="None">All Genres</MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="SF">SF</MenuItem>
            <MenuItem value="Romance">Romance</MenuItem>
            <MenuItem value="Novel">Novel</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
          </Select>
        </FormControl>
        {userRole === "Author" && (
          <Button variant="contained" color="secondary" onClick={() => setOpenCreateDialog(true)}>
            Create
          </Button>
        )}
      </Box>

      <TableContainer sx={{ width: "60%", borderRadius: "10px" }}>
        <Table>
        <TableHead>
                <TableRow>
                    <TableCell  sx={{   borderBottom: "none", color: "white", textAlign: "center"}}>
                            Title
                    </TableCell>

                     <TableCell  sx={{   borderBottom: "none", color: "white", textAlign: "center"}}>
                            Genre
                    </TableCell>
                </TableRow>
            </TableHead>
          
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell sx={{ borderBottom: "none", color: "white", textAlign: "center" }}>
                  {book.title}
                </TableCell>

                <TableCell sx={{ borderBottom: "none", color: "white", textAlign: "center" }}>
                    {book.genre}
                </TableCell>

                <TableCell sx={{ borderBottom: "none", color: "white", textAlign: "center" }}>
                   
                    {token!==null&&(
                    <Button variant="contained" color="secondary" onClick={()=>handleViewBook(book)}>
                        View
                    </Button>
                    )}

                    {username === book.authorName &&(
                        <Button variant="contained" color="secondary" onClick={()=>handleDelete(book.id)}>
                            Delete
                        </Button>
                    )}

                    {token === null && (
                        <Typography variant="h7">
                                You need to login to see the content
                        </Typography>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 3 }}>
        {renderPageNumbers()}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedBook && (
          <>
            <DialogTitle>{selectedBook.title}</DialogTitle>
            <DialogContent>
              <Typography><strong>Author:</strong> {selectedBook.authorName}</Typography>
              <Typography><strong>Genre:</strong> {selectedBook.genre}</Typography>
              <Typography><strong>Description:</strong> {selectedBook.description}</Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDownload} color="primary">
                Download
              </Button>
              <Button onClick={handleCloseDialog} color="primary">Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>


      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>Create a New Book</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            variant="outlined"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Genre</InputLabel>
            <Select
              value={newBook.genre}
              onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            >
              <MenuItem value="Fiction">Fiction</MenuItem>
              <MenuItem value="SF">SF</MenuItem>
              <MenuItem value="Romance">Romance</MenuItem>
              <MenuItem value="Novel">Novel</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          />


        <Button
            variant="contained"
            component="label"
            fullWidth
            margin="dense"
            sx={{ backgroundColor: "#1976d2", color: "white" }}
          >
            Upload File
            <input
              type="file"
              hidden
              accept=".pdf"
              onChange={(e) => setNewBook({ ...newBook, file: e.target.files[0] })}
            />
          </Button>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleCreateBook} color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BooksTable;
