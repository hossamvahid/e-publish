package com.epublish.epublish_be.security;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class SecurityConstants {

    @Value("${security.jwt.expiration}")
    private long jwtExpiration;

    @Value("${security.jwt.secret}")
    private String jwtSecret;

    @Value("${security.admin.username}")
    private String adminUsername;

    @Value("${security.admin.password}")
    private String adminPassword;


}
