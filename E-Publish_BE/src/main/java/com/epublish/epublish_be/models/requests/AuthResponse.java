package com.epublish.epublish_be.models.requests;

import lombok.Data;

@Data
public class AuthResponse {

    private String access_token;
    private String token_type="Bearer ";

    public AuthResponse(String access_token){
        this.access_token=access_token;
    }
}
