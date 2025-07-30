package com.example.backendjava.dto;

import java.util.List;

public record UserCreateDTO(
        String username,
        String email,
        String password,
        List<String> interests  // <-- new field
) {}
