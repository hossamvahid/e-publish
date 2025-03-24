package com.epublish.epublish_be.service;

import com.epublish.epublish_be.enums.Status;
import com.epublish.epublish_be.models.User;
import com.epublish.epublish_be.models.response.UserResponse;
import com.epublish.epublish_be.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Page<UserResponse> getUsers(int page) {
        Page<User> users = userRepository.findByStatus(Status.User, PageRequest.of(page,5));
        return users.map(UserResponse::new);
    }

    public Page<UserResponse> getAuthors(int page) {
        Page<User> users=userRepository.findByStatus(Status.Author, PageRequest.of(page,5));
        return users.map(UserResponse::new);
    }

    public Page<UserResponse> getPendings(int page) {
      Page<User> users=userRepository.findByStatus(Status.Pending, PageRequest.of(page,5));
      return users.map(UserResponse::new);
    }


    public ResponseEntity<String> changeAuthor(int id){
        User user=userRepository.findById(id).orElseThrow(()->new EntityNotFoundException("User not found"));
        user.setStatus(Status.Author);
        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    public ResponseEntity<String> changeUser(int id){
        User user=userRepository.findById(id).orElseThrow(()->new EntityNotFoundException("User not found"));
        user.setStatus(Status.User);
        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<String> delete(int id) {
        userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
