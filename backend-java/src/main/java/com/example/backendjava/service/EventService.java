package com.example.backendjava.service;

import com.example.backendjava.domain.Event;
import com.example.backendjava.domain.User;
import com.example.backendjava.dto.EventCreateDTO;
import com.example.backendjava.dto.EventResponseDTO;
import com.example.backendjava.repository.EventRepository;
import com.example.backendjava.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository; // assuming user is authenticated

    public List<EventResponseDTO> getAll() {
        return eventRepository.findAll().stream()
            .map(e -> new EventResponseDTO(
                e.getId(), e.getTitle(), e.getDescription(), e.getFlyerUrl(), e.getLocation(),
                e.getDateTime(), e.getCreatedBy().getUsername(), e.getCreatedAt()
            )).collect(Collectors.toList());
    }

    public EventResponseDTO create(EventCreateDTO dto) {
        User dummyUser = userRepository.findById(1).orElseThrow();
        Event event = Event.builder()
                .title(dto.title())
                .description(dto.description())
                .flyerUrl(dto.flyerUrl())
                .location(dto.location())
                .dateTime(dto.dateTime())
                .createdBy(dummyUser)
                .createdAt(LocalDateTime.now())
                .build();
        Event saved = eventRepository.save(event);
        return new EventResponseDTO(saved.getId(), saved.getTitle(), saved.getDescription(), saved.getFlyerUrl(), saved.getLocation(), saved.getDateTime(), dummyUser.getUsername(), saved.getCreatedAt());
    }

    public List<EventResponseDTO> getByDate(LocalDate date) {
        try{
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

            return eventRepository.findByDateTimeBetween(startOfDay, endOfDay).stream()
                    .map(e -> new EventResponseDTO(
                            e.getId(),
                            e.getTitle(),
                            e.getDescription(),
                            e.getFlyerUrl(),
                            e.getLocation(),
                            e.getDateTime(),
                            e.getCreatedBy().getUsername(),
                            e.getCreatedAt()

                    ))
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            return Collections.emptyList();
        }

    }
    public List<EventResponseDTO> search(String keyword) {
        return eventRepository
                .findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword)
                .stream()
                .map(e -> new EventResponseDTO(
                        e.getId(), e.getTitle(), e.getDescription(), e.getFlyerUrl(), e.getLocation(),
                        e.getDateTime(), e.getCreatedBy().getUsername(), e.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

} 