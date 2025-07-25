package com.example.backendjava.controller;

import com.example.backendjava.dto.CommentCreateDTO;
import com.example.backendjava.dto.CommentResponseDTO;
import com.example.backendjava.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public List<CommentResponseDTO> getAll() {
        return commentService.getAll();
    }

    @PostMapping
    public CommentResponseDTO create(@RequestBody CommentCreateDTO dto) {
        return commentService.create(dto);
    }
} 