package com.example.backendjava.repository;

import com.example.backendjava.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String titleKeyword, String descKeyword);
    List<Event> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);
} 