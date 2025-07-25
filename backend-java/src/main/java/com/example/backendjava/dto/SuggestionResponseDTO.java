package com.example.backendjava.dto;

import java.time.LocalDateTime;

public record SuggestionResponseDTO(Integer id, String title, String description, String category, String status, String createdBy, LocalDateTime createdAt) {} 