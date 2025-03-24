package com.epublish.epublish_be.repository;

import com.epublish.epublish_be.enums.Status;
import com.epublish.epublish_be.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Page<User> findByStatus(Status status, Pageable pageable);
}
