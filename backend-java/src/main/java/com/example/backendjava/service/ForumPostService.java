package com.example.backendjava.service;

import com.example.backendjava.domain.ForumPost;
import com.example.backendjava.domain.User;
import com.example.backendjava.dto.ForumPostCreateDTO;
import com.example.backendjava.dto.ForumPostResponseDTO;
import com.example.backendjava.repository.ForumPostRepository;
import com.example.backendjava.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ForumPostService {
    private final ForumPostRepository forumPostRepository;
    private final UserRepository userRepository;

    public List<ForumPostResponseDTO> getAll() {
        return forumPostRepository.findAll().stream()
                .map(f -> new ForumPostResponseDTO(f.getId(), f.getTitle(), f.getContent(), f.isAnonymous(),
                        f.getCreatedBy().getUsername(), f.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public ForumPostResponseDTO create(ForumPostCreateDTO dto) {
        User user = userRepository.findById(1).orElseThrow();
        ForumPost post = ForumPost.builder()
                .title(dto.title())
                .content(dto.content())
                .anonymous(dto.anonymous())
                .createdBy(dto.anonymous() ? null : user)
                .createdAt(LocalDateTime.now())
                .build();
        ForumPost saved = forumPostRepository.save(post);
        return new ForumPostResponseDTO(saved.getId(), saved.getTitle(), saved.getContent(), saved.isAnonymous(), user.getUsername(), saved.getCreatedAt());
    }
}