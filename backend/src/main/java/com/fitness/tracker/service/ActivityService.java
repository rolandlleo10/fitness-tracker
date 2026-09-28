package com.fitness.tracker.service;

import com.fitness.tracker.dto.ActivityRequest;
import com.fitness.tracker.dto.ActivityResponse;
import com.fitness.tracker.dto.WeeklyStats;
import com.fitness.tracker.entity.ActivityLog;
import com.fitness.tracker.entity.ActivityType;
import com.fitness.tracker.entity.User;
import com.fitness.tracker.repository.ActivityLogRepository;
import com.fitness.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityLogRepository activityLogRepository;
    private final UserRepository userRepository;

    public ActivityResponse logActivity(ActivityRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ActivityLog log = new ActivityLog();
        log.setUser(user);
        log.setType(request.getType());
        log.setValue(request.getValue());
        log.setDate(request.getDate());
        log.setNotes(request.getNotes());

        ActivityLog saved = activityLogRepository.save(log);

        return new ActivityResponse(
                saved.getId(),
                saved.getType(),
                saved.getValue(),
                saved.getDate(),
                saved.getNotes()
        );
    }

    public List<ActivityResponse> getByDate(String email, LocalDate date) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return activityLogRepository.findByUserIdAndDate(user.getId(), date)
                .stream()
                .map(log -> new ActivityResponse(
                        log.getId(),
                        log.getType(),
                        log.getValue(),
                        log.getDate(),
                        log.getNotes()
                ))
                .collect(Collectors.toList());
    }

    public WeeklyStats getWeeklyStats(String email, LocalDate startDate) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate monday = (startDate != null) ? startDate.with(DayOfWeek.MONDAY)
                : LocalDate.now().with(DayOfWeek.MONDAY);
        LocalDate sunday = monday.plusDays(6);

        List<ActivityLog> logs = activityLogRepository
                .findByUserIdAndDateBetweenOrderByDateAsc(user.getId(), monday, sunday);

        List<String> labels = List.of("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");

        Map<ActivityType, List<Double>> series = new HashMap<>();
        for (ActivityType type : ActivityType.values()) {
            series.put(type, new ArrayList<>(Collections.nCopies(7, 0.0)));
        }

        for (ActivityLog log : logs) {
            int dayIndex = log.getDate().getDayOfWeek().getValue() - 1;
            List<Double> values = series.get(log.getType());
            values.set(dayIndex, values.get(dayIndex) + log.getValue());
        }

        return new WeeklyStats(labels, series);
    }

    public List<ActivityResponse> getRecentActivities(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("=== Fetching activities for user ID: " + user.getId() + " ===");

        List<ActivityLog> logs = activityLogRepository.findByUserId(user.getId());
        System.out.println("Found " + logs.size() + " activities");

        return logs.stream()
                .sorted((a, b) -> b.getDate().compareTo(a.getDate()))
                .limit(50)
                .map(log -> new ActivityResponse(
                        log.getId(),
                        log.getType(),
                        log.getValue(),
                        log.getDate(),
                        log.getNotes()
                ))
                .collect(Collectors.toList());
    }

    public void deleteActivity(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ActivityLog log = activityLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        if (!log.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized");
        }

        activityLogRepository.delete(log);
    }
}