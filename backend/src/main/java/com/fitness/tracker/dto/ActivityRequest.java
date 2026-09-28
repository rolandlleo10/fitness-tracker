package com.fitness.tracker.dto;

import com.fitness.tracker.entity.ActivityType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ActivityRequest {

    @NotNull(message = "Activity type is required")
    private ActivityType type;

    @NotNull(message = "Value is required")
    @Positive(message = "Value must be positive")
    private Double value;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private String notes;
}