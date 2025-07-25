package com.example.backendjava.dto;

import java.time.LocalDateTime;

public record VoteResponseDTO(Integer id, Integer userId, Integer targetId, String targetType, int value, LocalDateTime votedAt) {} 