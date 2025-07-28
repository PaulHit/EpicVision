package com.example.backendjava.service;

import com.example.backendjava.domain.Comment;
import com.example.backendjava.domain.ForumPost;
import com.example.backendjava.dto.CommentCreateDTO;
import com.example.backendjava.dto.CommentResponseDTO;
import com.example.backendjava.repository.CommentRepository;
import com.example.backendjava.repository.ForumPostRepository;
import com.example.backendjava.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ForumPostRepository forumPostRepository;
    private final UserRepository userRepository;

    public List<CommentResponseDTO> getAll() {
        return commentRepository.findAll().stream().map(c ->
                new CommentResponseDTO(
                        c.getId(),
                        c.getContent(),
                        c.getCreatedBy().getUsername(),
                        c.getForumPost() != null ? c.getForumPost().getId() : null,
                        c.getCreatedAt())
        ).collect(Collectors.toList());
    }

    public CommentResponseDTO create(CommentCreateDTO dto) {
        var user = userRepository.findById(1).orElseThrow();

        ForumPost post = null;

        if (dto.forumPostId() != null) {
            post = forumPostRepository.findById(dto.forumPostId()).orElseThrow();
        }

        var comment = Comment.builder()
                .content(dto.content())
                .createdBy(user)
                .forumPost(post)
                .createdAt(LocalDateTime.now())
                .build();

        var saved = commentRepository.save(comment);

        return new CommentResponseDTO(
                saved.getId(),
                saved.getContent(),
                user.getUsername(),
                post != null ? post.getId() : null,
                saved.getCreatedAt());
    }
}
