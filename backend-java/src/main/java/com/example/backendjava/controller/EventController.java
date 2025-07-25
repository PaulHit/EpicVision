package com.example.backendjava.controller;

import com.example.backendjava.dto.EventCreateDTO;
import com.example.backendjava.dto.EventResponseDTO;
import com.example.backendjava.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping
    public List<EventResponseDTO> getAllOrFilter(@RequestParam(required = false) LocalDate date) {
        if (date != null) {
            return eventService.getByDate(date);
        }
        return eventService.getAll();
    }

    @PostMapping
    public EventResponseDTO create(@RequestBody EventCreateDTO dto) {
        return eventService.create(dto);
    }

    @GetMapping("/search")
    public List<EventResponseDTO> search(@RequestParam String keyword) {
        return eventService.search(keyword);
    }


} 