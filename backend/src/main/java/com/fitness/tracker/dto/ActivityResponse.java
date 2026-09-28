package com.fitness.tracker.dto;

import com.fitness.tracker.entity.ActivityLog;
import com.fitness.tracker.entity.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ActivityResponse {
    private Long id;
    private ActivityType type;
    private Double value;
    private LocalDate date;
    private String notes;

    public ActivityResponse(Long id, Long id1, Class<? extends ActivityLog> aClass, Long id2, Class<? extends ActivityLog> aClass1) {
    }
}