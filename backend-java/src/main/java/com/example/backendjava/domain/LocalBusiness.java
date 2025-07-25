package com.example.backendjava.domain;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocalBusiness {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String location;
    private String contactInfo;

    @ManyToOne
    private User addedBy;

    public enum Category {
        FOOD, REPAIR, EDUCATION, HEALTH, SERVICES
    }
}