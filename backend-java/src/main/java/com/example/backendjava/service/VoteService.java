package com.example.backendjava.service;

import com.example.backendjava.domain.Vote;
import com.example.backendjava.domain.User;
import com.example.backendjava.dto.VoteCreateDTO;
import com.example.backendjava.dto.VoteResponseDTO;
import com.example.backendjava.repository.VoteRepository;
import com.example.backendjava.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final UserRepository userRepository;

    public List<VoteResponseDTO> getAll() {
        return voteRepository.findAll().stream()
            .map(v -> new VoteResponseDTO(
                v.getId(), v.getUser().getId(), v.getTargetId(),
                v.getTargetType().name(), v.getValue(), v.getVotedAt()
            )).collect(Collectors.toList());
    }

    public VoteResponseDTO create(VoteCreateDTO dto) {
        User dummyUser = userRepository.findById(1).orElseThrow();
        Vote vote = Vote.builder()
                .user(dummyUser)
                .targetId(dto.targetId())
                .targetType(Vote.TargetType.valueOf(dto.targetType()))
                .value(dto.value())
                .votedAt(LocalDateTime.now())
                .build();
        Vote saved = voteRepository.save(vote);
        return new VoteResponseDTO(saved.getId(), dummyUser.getId(), saved.getTargetId(), saved.getTargetType().name(), saved.getValue(), saved.getVotedAt());
    }
} 