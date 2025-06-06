package com.epublish.epublish_be.models;


import com.epublish.epublish_be.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;

    @Email
    private String email;

    private String password;

    private Status status=Status.User;

    @OneToMany(mappedBy = "user")
    private List<Book> books;



}
