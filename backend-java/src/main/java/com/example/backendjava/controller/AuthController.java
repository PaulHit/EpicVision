package com.example.backendjava.controller;

import com.example.backendjava.domain.User;
import com.example.backendjava.dto.UserLoginDTO;
import com.example.backendjava.repository.UserRepository;
import com.example.backendjava.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO dto) {
        User user = userRepository.findByUsername(dto.username());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!user.getPassword().equals(dto.password())) { // use hashing in real life
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong password");
        }

        String token = jwtService.generateToken(user.getUsername());
        return ResponseEntity.ok(Map.of("token", token));
    }
}

