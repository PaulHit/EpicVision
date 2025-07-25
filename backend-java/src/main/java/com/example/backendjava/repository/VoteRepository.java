package com.example.backendjava.repository;

import com.example.backendjava.domain.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Integer> {
    List<Vote> findByTargetIdAndTargetType(Integer targetId, Vote.TargetType targetType);
    boolean existsByUserIdAndTargetIdAndTargetType(Integer userId, Integer targetId, Vote.TargetType targetType);
} 