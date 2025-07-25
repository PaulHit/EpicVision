package com.example.backendjava.domain;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Suggestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    private User createdBy;
    private LocalDateTime createdAt;

    public enum Category {
        TRAFFIC, SAFETY, INFRASTRUCTURE, SOCIAL, ENVIRONMENT
    }

    public enum Status {
        NEW, UNDER_REVIEW, RESOLVED
    }
}
