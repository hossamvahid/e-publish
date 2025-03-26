package com.epublish.epublish_be.repository;

import com.epublish.epublish_be.enums.Genre;
import com.epublish.epublish_be.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookRepository extends JpaRepository<Book,Integer> {

    Page<Book> findByGenre(Genre genre, Pageable pageable);
    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Book> findAll(Pageable pageable);
    Book findById(int id);

    @Query("SELECT b FROM Book b WHERE b.genre = :genre AND LOWER(b.title) LIKE LOWER(CONCAT('%', :titlePart, '%'))")
    Page<Book> findByGenreAndTitleContainingIgnoreCase(@Param("genre") Genre genre,@Param("titlePart") String title, Pageable pageable);
}
