package com.example.backendjava.repository;

import com.example.backendjava.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByForumPostId(Integer forumPostId);
} 