package com.example.backendjava.controller;

import com.example.backendjava.dto.ForumPostCreateDTO;
import com.example.backendjava.dto.ForumPostResponseDTO;
import com.example.backendjava.service.ForumPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/forum-posts")
@RequiredArgsConstructor
public class ForumPostController {
    private final ForumPostService forumPostService;

    @GetMapping
    public List<ForumPostResponseDTO> getAll() {
        return forumPostService.getAll();
    }

    @PostMapping
    public ForumPostResponseDTO create(@RequestBody ForumPostCreateDTO dto) {
        return forumPostService.create(dto);
    }
} 