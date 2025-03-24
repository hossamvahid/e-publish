package com.epublish.epublish_be.controllers;


import com.epublish.epublish_be.models.User;
import com.epublish.epublish_be.models.response.UserResponse;
import com.epublish.epublish_be.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("users")
    public Page<UserResponse> getUsers(
            @RequestParam(defaultValue = "1") int page) {

        page = page - 1;
        return adminService.getUsers(page);
    }

    @GetMapping("authors")
    public Page<UserResponse> getAuthors(
            @RequestParam(defaultValue = "1") int page) {

        page = page - 1;
        return adminService.getAuthors(page);
    }

    @GetMapping("pendings")
    public Page<UserResponse> getPendings(
            @RequestParam(defaultValue = "1") int page) {

        page= page - 1;
        return adminService.getPendings(page);
    }


    @PutMapping("author")
    public ResponseEntity<String> updateAuthor(@RequestParam int id) {
        return adminService.changeAuthor(id);
    }

    @PutMapping("user")
    public ResponseEntity<String> updateUser(@RequestParam int id) {
        return adminService.changeUser(id);
    }

    @DeleteMapping("remove")
    public ResponseEntity<String> deleteUser(@RequestParam int id) {
        return adminService.delete(id);
    }



}
