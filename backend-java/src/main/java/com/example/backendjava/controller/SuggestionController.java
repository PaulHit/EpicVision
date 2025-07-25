package com.example.backendjava.controller;

import com.example.backendjava.dto.SuggestionCreateDTO;
import com.example.backendjava.dto.SuggestionResponseDTO;
import com.example.backendjava.service.SuggestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/suggestions")
@RequiredArgsConstructor
public class SuggestionController {
    private final SuggestionService suggestionService;

    @GetMapping
    public List<SuggestionResponseDTO> getAll() {
        return suggestionService.getAll();
    }

    @PostMapping
    public SuggestionResponseDTO create(@RequestBody SuggestionCreateDTO dto) {
        return suggestionService.create(dto);
    }
} 