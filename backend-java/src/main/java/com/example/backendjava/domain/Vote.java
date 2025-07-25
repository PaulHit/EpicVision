package com.example.backendjava.domain;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private User user;

    private Integer targetId;

    @Enumerated(EnumType.STRING)
    private TargetType targetType;

    private int value; // +1 or -1
    private LocalDateTime votedAt;

    public enum TargetType {
        EVENT, SUGGESTION, FORUM_POST
    }
}