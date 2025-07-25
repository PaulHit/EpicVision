package com.example.backendjava.dto;

import java.time.LocalDateTime;

public record EventResponseDTO(Integer id, String title, String description, String flyerUrl, String location, LocalDateTime dateTime, String createdBy, LocalDateTime createdAt) {} 