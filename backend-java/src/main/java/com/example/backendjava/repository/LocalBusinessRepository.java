package com.example.backendjava.repository;

import com.example.backendjava.domain.LocalBusiness;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LocalBusinessRepository extends JpaRepository<LocalBusiness, Integer> {
    List<LocalBusiness> findByCategory(LocalBusiness.Category category);
    List<LocalBusiness> findByNameContainingIgnoreCaseOrCategory(String name, LocalBusiness.Category category);
    List <LocalBusiness> findByNameContainingIgnoreCase(String name);
} 