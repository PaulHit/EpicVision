package com.example.backendjava.service;

import com.example.backendjava.domain.User;
import com.example.backendjava.dto.UserCreateDTO;
import com.example.backendjava.dto.UserResponseDTO;
import com.example.backendjava.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserResponseDTO> getAll() {
        return userRepository.findAll().stream()
            .map(user -> new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail()))
            .collect(Collectors.toList());
    }

    public UserResponseDTO create(UserCreateDTO dto) {
        User user = User.builder()
                .username(dto.username())
                .email(dto.email())
                .password(dto.password()) // ⚠️ add hashing in real use
                .role(User.Role.USER)
                .createdAt(LocalDateTime.now())
                .build();
        User saved = userRepository.save(user);
        return new UserResponseDTO(saved.getId(), saved.getUsername(), saved.getEmail());
    }
} 