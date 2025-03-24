package com.epublish.epublish_be.security;

import com.epublish.epublish_be.enums.Status;
import com.epublish.epublish_be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;
    private SecurityConstants securityConstants;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository, SecurityConstants securityConstants) {
        this.userRepository = userRepository;
        this.securityConstants = securityConstants;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if(securityConstants.getAdminUsername().equals(username))
        {
            return new User(username,securityConstants.getAdminPassword(),getAuthorities(Status.Admin));
        }

        com.epublish.epublish_be.models.User user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("User not found"));

        return new User(user.getUsername(),user.getPassword(), getAuthorities(user.getStatus()));

    }

    private Collection<GrantedAuthority> getAuthorities(Status status) {
        return List.of(new SimpleGrantedAuthority(status.name()));
    }

}
