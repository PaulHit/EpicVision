package com.example.backendjava.controller;

import com.example.backendjava.domain.LocalBusiness;
import com.example.backendjava.dto.LocalBusinessCreateDTO;
import com.example.backendjava.dto.LocalBusinessResponseDTO;
import com.example.backendjava.service.LocalBusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/local-businesses")
@RequiredArgsConstructor
public class LocalBusinessController {
    private final LocalBusinessService businessService;

    @PostMapping
    public LocalBusinessResponseDTO create(@RequestBody LocalBusinessCreateDTO dto) {
        return businessService.create(dto);
    }

    @GetMapping
    public List<LocalBusinessResponseDTO> getAllOrFiltered(@RequestParam(required = false) String category) {
        if (category != null) {
            return businessService.getByCategory(category);
        }
        return businessService.getAll();
    }

    @GetMapping("/search")
    public List<LocalBusinessResponseDTO> search(@RequestParam String keyword) {
        return businessService.search(keyword);
    }

} 