package com.epublish.epublish_be.models.response;

import com.epublish.epublish_be.enums.Status;
import com.epublish.epublish_be.models.User;
import lombok.Data;

@Data
public class UserResponse {
    private int id;
    private String username;
    private Status status;

    public UserResponse(User user)
    {
        this.id=user.getId();
        this.username = user.getUsername();
        this.status =user.getStatus();
    }
}
