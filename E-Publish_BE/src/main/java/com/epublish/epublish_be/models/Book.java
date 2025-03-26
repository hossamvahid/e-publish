package com.epublish.epublish_be.models;

import com.epublish.epublish_be.enums.Genre;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    private String description;

    private String filename;

    private Genre genre;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public  Book(String title, String description, Genre genre, String filename,User user) {
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.filename = filename;
        this.user = user;
    }
}
