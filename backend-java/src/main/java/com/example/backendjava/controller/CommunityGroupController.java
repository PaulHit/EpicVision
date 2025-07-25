package com.example.backendjava.controller;

import com.example.backendjava.dto.CommunityGroupCreateDTO;
import com.example.backendjava.dto.CommunityGroupResponseDTO;
import com.example.backendjava.service.CommunityGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/community-groups")
@RequiredArgsConstructor
public class CommunityGroupController {
    private final CommunityGroupService groupService;

    @GetMapping
    public List<CommunityGroupResponseDTO> getAll() {
        return groupService.getAll();
    }

    @PostMapping
    public CommunityGroupResponseDTO create(@RequestBody CommunityGroupCreateDTO dto) {
        return groupService.create(dto);
    }
} 