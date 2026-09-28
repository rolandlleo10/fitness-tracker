package com.fitness.tracker.controller;

import com.fitness.tracker.dto.ActivityRequest;
import com.fitness.tracker.dto.ActivityResponse;
import com.fitness.tracker.dto.WeeklyStats;
import com.fitness.tracker.service.ActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping
    public ResponseEntity<ActivityResponse> logActivity(
            @Valid @RequestBody ActivityRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(activityService.logActivity(request, email));
    }

    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getByDate(
            @RequestParam LocalDate date,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(activityService.getByDate(email, date));
    }

    @GetMapping("/week")
    public ResponseEntity<WeeklyStats> getWeeklyStats(
            @RequestParam(required = false) LocalDate start,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(activityService.getWeeklyStats(email, start));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<ActivityResponse>> getRecent(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(activityService.getRecentActivities(email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        activityService.deleteActivity(id, email);
        return ResponseEntity.noContent().build();
    }
}