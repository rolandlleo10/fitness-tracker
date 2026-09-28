package com.fitness.tracker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "activity_logs")
public class ActivityLog1 {

    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType type;

    private Double value;

    private LocalDate date;

    private String notes;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public ActivityLog1() {
    }

    public ActivityLog1(User user, ActivityType type, Double value, LocalDate date, String notes) {
        this.user = user;
        this.type = type;
        this.value = value;
        this.date = date;
        this.notes = notes;
    }

}