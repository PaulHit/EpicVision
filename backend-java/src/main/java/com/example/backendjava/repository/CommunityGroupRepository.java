package com.example.backendjava.repository;

import com.example.backendjava.domain.CommunityGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommunityGroupRepository extends JpaRepository<CommunityGroup, Integer> {
    List<CommunityGroup> findByNameContainingIgnoreCase(String name);
} 