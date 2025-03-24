package com.epublish.epublish_be.service;

import com.epublish.epublish_be.enums.Status;
import com.epublish.epublish_be.models.User;
import com.epublish.epublish_be.models.requests.AuthResponse;
import com.epublish.epublish_be.models.requests.LoginModel;
import com.epublish.epublish_be.models.requests.RegisterModel;
import com.epublish.epublish_be.repository.UserRepository;
import com.epublish.epublish_be.security.CustomUserDetailsService;
import com.epublish.epublish_be.security.JwtUtil;
import com.epublish.epublish_be.security.SecurityConstants;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserDetailsService userDetailsService;
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;
    private SecurityConstants securityConstants;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDetailsService userDetailsService, SecurityConstants securityConstants) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.securityConstants = securityConstants;
    }

    /*
        Register business logic
     */
    public ResponseEntity<String> register(RegisterModel registerRequest)
    {

        if(userRepository.findByUsername(registerRequest.getUsername()).isPresent() && userRepository.findByEmail(registerRequest.getEmail()).isPresent())
        {
            return new ResponseEntity<>("User already exists", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setUsername(registerRequest.getUsername());

        userRepository.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    /*
        Login business logic
    */
    public ResponseEntity<AuthResponse> login(LoginModel loginRequest)
    {

        if(securityConstants.getAdminUsername().equals(loginRequest.getUsername()) && securityConstants.getAdminPassword().equals(loginRequest.getPassword()))
        {
            String token = jwtUtil.generateToken(loginRequest.getUsername(),Status.Admin);
            return new ResponseEntity<>(new AuthResponse(token), HttpStatus.OK);
        }

        Authentication authentication = authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));



        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token= jwtUtil.generateToken(userDetails.getUsername(),user.getStatus());
        return new ResponseEntity<>(new AuthResponse(token), HttpStatus.OK);
    }

    /*
        Get the user role from token
     */

    public ResponseEntity<Map<String,String>> getRole()
    {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();

        String role=authentication.getAuthorities().stream().findFirst().get().getAuthority();
        Map<String,String> response = new HashMap<>();
        response.put("role",role);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*
        Get the username of the user from token
     */
    public ResponseEntity<Map<String,String>> getUsername()
    {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();

        String username=authentication.getName();

        Map<String,String> response = new HashMap<>();
        response.put("username",username);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    /*
        Change the user password
     */

    public ResponseEntity<String> ChangePassword(String newPassword)
    {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        Optional<User> userOptional = userRepository.findByUsername(authentication.getName());

        if(!userOptional.isPresent())
        {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }

        User user=userOptional.get();
        user.setPassword(passwordEncoder.encode(newPassword));


        userRepository.save(user);
        return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
    }

    /*
        Requesting for the author role
     */

    public ResponseEntity<String> changeStatus()
    {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        Optional<User> userOptional = userRepository.findByUsername(authentication.getName());
        if(!userOptional.isPresent())
        {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }

        User user=userOptional.get();
        user.setStatus(Status.Pending);
        userRepository.save(user);
        return new ResponseEntity<>("Status changed successfully", HttpStatus.OK);
    }



}
