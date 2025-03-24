package com.epublish.epublish_be.controllers;

import com.epublish.epublish_be.models.User;
import com.epublish.epublish_be.models.requests.AuthResponse;
import com.epublish.epublish_be.models.requests.LoginModel;
import com.epublish.epublish_be.models.requests.RegisterModel;
import com.epublish.epublish_be.repository.UserRepository;
import com.epublish.epublish_be.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterModel registerRequest)
    {
        return userService.register(registerRequest);
    }

    @PostMapping("login")

    public ResponseEntity<AuthResponse> login(@RequestBody LoginModel loginRequest)
    {
        return userService.login(loginRequest);
    }

    @GetMapping("role")

    public ResponseEntity<Map<String,String>>  getRole()
    {
        return userService.getRole();
    }

    @GetMapping("username")

    public ResponseEntity<Map<String,String>> getUsername()
    {
        return userService.getUsername();
    }



}
