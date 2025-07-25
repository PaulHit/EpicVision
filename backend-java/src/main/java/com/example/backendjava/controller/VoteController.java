package com.example.backendjava.controller;

import com.example.backendjava.dto.VoteCreateDTO;
import com.example.backendjava.dto.VoteResponseDTO;
import com.example.backendjava.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/votes")
@RequiredArgsConstructor
public class VoteController {
    private final VoteService voteService;

    @GetMapping
    public List<VoteResponseDTO> getAll() {
        return voteService.getAll();
    }

    @PostMapping
    public VoteResponseDTO create(@RequestBody VoteCreateDTO dto) {
        return voteService.create(dto);
    }
}
