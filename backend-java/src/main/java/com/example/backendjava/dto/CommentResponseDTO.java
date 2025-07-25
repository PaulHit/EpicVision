package com.example.backendjava.dto;

import java.time.LocalDateTime;

public record CommentResponseDTO(Integer id, String content, String createdBy, Integer forumPostId, LocalDateTime createdAt) {} 