package com.example.backendjava.controller;

import com.example.backendjava.dto.UserCreateDTO;
import com.example.backendjava.dto.UserResponseDTO;
import com.example.backendjava.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<UserResponseDTO> getAll() {
        return userService.getAll();
    }

    @PostMapping
    public UserResponseDTO create(@RequestBody UserCreateDTO dto) {
        return userService.create(dto);
    }
} 