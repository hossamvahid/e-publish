package com.epublish.epublish_be.security;

import com.epublish.epublish_be.enums.Status;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
@Component
public class JwtUtil {
    private SecurityConstants securityConstants;
    public JwtUtil(SecurityConstants securityConstants) {
        this.securityConstants = securityConstants;
    }

    public String generateToken(String username, Status status) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role",status.name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+securityConstants.getJwtExpiration()))
                .signWith(SignatureAlgorithm.HS256, securityConstants.getJwtSecret())
                .compact();
    }


    public String extractUsername(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(securityConstants.getJwtSecret())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Status getStatusFromToken(String token)
    {
        Claims claims=Jwts.parser()
                .setSigningKey(securityConstants.getJwtSecret())
                .parseClaimsJws(token)
                .getBody();

        return Status.valueOf(claims.get("role").toString());
    }

    public boolean validateToken(String token,String username) {
        String extractedUsername = extractUsername(token);
        boolean isExpired = isTokenExpired(token);
        boolean usernameMatches = username.equals(extractedUsername);

        return usernameMatches && !isExpired;
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(securityConstants.getJwtSecret())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }
}
