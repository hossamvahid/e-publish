package com.epublish.epublish_be.models.response;

import com.epublish.epublish_be.enums.Genre;
import com.epublish.epublish_be.models.Book;
import com.epublish.epublish_be.models.User;
import lombok.Data;

@Data
public class BookResponse {
    private int id;

    private String title;

    private String description;

    private String filename;

    private Genre genre;

    private String authorName;

    public BookResponse(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.description = book.getDescription();
        this.filename = book.getFilename();
        this.genre = book.getGenre();
        this.authorName = book.getUser().getUsername();
    }
}
