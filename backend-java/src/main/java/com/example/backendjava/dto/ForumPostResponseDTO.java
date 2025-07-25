package com.example.backendjava.dto;

import java.time.LocalDateTime;

public record ForumPostResponseDTO(Integer id, String title, String content, boolean anonymous, String createdBy, LocalDateTime createdAt) {} 