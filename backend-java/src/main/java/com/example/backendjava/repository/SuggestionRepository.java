package com.example.backendjava.repository;

import com.example.backendjava.domain.Suggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SuggestionRepository extends JpaRepository<Suggestion, Integer> {
    List<Suggestion> findByCategory(Suggestion.Category category);
    List<Suggestion> findByStatus(Suggestion.Status status);
} 