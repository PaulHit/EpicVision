package com.example.backendjava.dto;

import java.time.LocalDateTime;

public record EventCreateDTO(String title, String description, String flyerUrl, String location, LocalDateTime dateTime) {} 