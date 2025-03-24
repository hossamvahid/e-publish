package com.epublish.epublish_be.controllers;

import com.epublish.epublish_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("change")
    public ResponseEntity<String> changePassword(@RequestBody Map<String,String> newPassword){

        String password=newPassword.get("newPassword");

        return userService.ChangePassword(password);
    }

    @PutMapping("request")
    public ResponseEntity<String> changeStatus(){
        return userService.changeStatus();
    }


}
