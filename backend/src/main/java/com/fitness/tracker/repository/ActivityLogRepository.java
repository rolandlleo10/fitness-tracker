package com.fitness.tracker.repository;

import com.fitness.tracker.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    List<ActivityLog> findByUserIdAndDateBetweenOrderByDateAsc(
            Long userId, LocalDate start, LocalDate end);

    List<ActivityLog> findByUserIdAndDate(Long userId, LocalDate date);

    List<ActivityLog> findByUserId(Long userId);   // ← this one is important

    @Query("SELECT a FROM ActivityLog a WHERE a.user.id = :userId ORDER BY a.date DESC")
    default List<ActivityLog> findRecentByUserId(@Param("userId") Long userId) {
        return null;
    }
}

