package com.example.backendjava.domain;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;
    private String flyerUrl;
    private String location;
    private LocalDateTime dateTime;

    @ManyToOne
    private User createdBy;
    private LocalDateTime createdAt;
}
