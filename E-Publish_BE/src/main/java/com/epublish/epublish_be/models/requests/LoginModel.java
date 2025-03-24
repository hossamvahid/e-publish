package com.epublish.epublish_be.models.requests;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class LoginModel {

    private String username;

    private String password;
}
