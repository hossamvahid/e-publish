package com.epublish.epublish_be.service;

import com.epublish.epublish_be.enums.Genre;
import com.epublish.epublish_be.minio.MinioService;
import com.epublish.epublish_be.models.Book;
import com.epublish.epublish_be.models.User;
import com.epublish.epublish_be.models.response.BookResponse;
import com.epublish.epublish_be.models.response.UserResponse;
import com.epublish.epublish_be.repository.BookRepository;
import com.epublish.epublish_be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class BookService {

    private MinioService minioService;
    private BookRepository bookRepository;
    private UserRepository userRepository;

    @Autowired
    public BookService(MinioService minioService, BookRepository bookRepository, UserRepository userRepository) {
        this.minioService = minioService;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> createBook(String title,String description,String genre, MultipartFile file){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user= userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("User not found"));
        Genre genreBook=Genre.valueOf(genre);
        String filename=minioService.uploadFile(file);

        Book book = new Book(title,description,genreBook,filename,user);
        bookRepository.save(book);

        return ResponseEntity.ok().build();
    }

    public Page<BookResponse> getBooks(int page, String partTitle, String genre){
        //Page<User> users = userRepository.findByStatus(Status.User, PageRequest.of(page,5));
        if(genre.equals("None") &&  partTitle.equals("None")){
           Page<Book> books = bookRepository.findAll(PageRequest.of(page,5));
            return books.map(BookResponse::new);
        }
        else if(genre.equals("None") &&  !partTitle.equals("None")){
            Page<Book> books = bookRepository.findByTitleContainingIgnoreCase(partTitle,PageRequest.of(page,5));
            return books.map(BookResponse::new);
        }
        else if(!genre.equals("None") && partTitle.equals("None")){
            Genre bookGenre = Genre.valueOf(genre);
            Page<Book> books = bookRepository.findByGenre(bookGenre,PageRequest.of(page,5));
            return books.map(BookResponse::new);
        }

        Genre bookGenre = Genre.valueOf(genre);
        Page<Book> books=bookRepository.findByGenreAndTitleContainingIgnoreCase(bookGenre,partTitle,PageRequest.of(page,5));
        return books.map(BookResponse::new);
    }


    public String downloadFile(int id){
        Book book = bookRepository.findById(id);

        return book.getFilename();
    }

    public ResponseEntity<?> delete(int id)
    {
        Book book = bookRepository.findById(id);
        minioService.deleteFile(book.getFilename());
        bookRepository.delete(book);
        return ResponseEntity.ok().build();
    }

}
