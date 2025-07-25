package com.example.backendjava.service;

import com.example.backendjava.domain.Suggestion;
import com.example.backendjava.domain.User;
import com.example.backendjava.dto.SuggestionCreateDTO;
import com.example.backendjava.dto.SuggestionResponseDTO;
import com.example.backendjava.repository.SuggestionRepository;
import com.example.backendjava.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SuggestionService {
    private final SuggestionRepository suggestionRepository;
    private final UserRepository userRepository;

    public List<SuggestionResponseDTO> getAll() {
        return suggestionRepository.findAll().stream()
            .map(s -> new SuggestionResponseDTO(
                s.getId(), s.getTitle(), s.getDescription(),
                s.getCategory().name(), s.getStatus().name(),
                s.getCreatedBy().getUsername(), s.getCreatedAt()
            )).collect(Collectors.toList());
    }

    public SuggestionResponseDTO create(SuggestionCreateDTO dto) {
        User dummyUser = userRepository.findById(1).orElseThrow();
        Suggestion suggestion = Suggestion.builder()
                .title(dto.title())
                .description(dto.description())
                .category(Suggestion.Category.valueOf(dto.category()))
                .status(Suggestion.Status.NEW)
                .createdBy(dummyUser)
                .createdAt(LocalDateTime.now())
                .build();
        Suggestion saved = suggestionRepository.save(suggestion);
        return new SuggestionResponseDTO(saved.getId(), saved.getTitle(), saved.getDescription(), saved.getCategory().name(), saved.getStatus().name(), dummyUser.getUsername(), saved.getCreatedAt());
    }
} 