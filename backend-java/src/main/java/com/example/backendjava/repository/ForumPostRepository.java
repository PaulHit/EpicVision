package com.example.backendjava.repository;

import com.example.backendjava.domain.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ForumPostRepository extends JpaRepository<ForumPost, Integer> {
    List<ForumPost> findByAnonymousFalse();
} 