package com.epublish.epublish_be.controllers;

import com.epublish.epublish_be.minio.MinioService;
import com.epublish.epublish_be.models.Book;
import com.epublish.epublish_be.models.response.BookResponse;
import com.epublish.epublish_be.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.io.InputStream;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/book")
public class BookController {

    BookService bookService;
    MinioService minioService;

    @Autowired
    public BookController(BookService bookService, MinioService minioService) {
        this.bookService = bookService;
        this.minioService = minioService;
    }

    @PostMapping("create")
    public ResponseEntity<?> createBook(@RequestParam String title, @RequestParam String description,@RequestParam String genre,@RequestBody MultipartFile file){

        return bookService.createBook(title,description,genre,file);
    }

    @GetMapping("get")
    public Page<BookResponse> getBooks(@RequestParam(defaultValue = "None") String genre, @RequestParam(defaultValue = "None")String partTitle, @RequestParam(defaultValue = "1") int page){
        page=page-1;
        return bookService.getBooks(page,partTitle,genre);
    }

    @GetMapping("download")
    public ResponseEntity<InputStreamResource> downloadBook(@RequestParam int id){
        InputStream fileStream = minioService.downloadFile(bookService.downloadFile(id));
        InputStreamResource resource = new InputStreamResource(fileStream);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename= "+bookService.downloadFile(id))
                .body(resource);

    }

    @DeleteMapping("delete")
    public ResponseEntity<?> deleteBook(@RequestParam int id){
        return  bookService.delete(id);
    }

}
