package com.fitness.tracker.dto;

import com.fitness.tracker.entity.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class WeeklyStats {
    private List<String> labels;
    private Map<ActivityType, List<Double>> series;
}