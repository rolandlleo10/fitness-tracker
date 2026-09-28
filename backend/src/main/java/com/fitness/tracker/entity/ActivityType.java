package com.fitness.tracker.entity;

import java.sql.ShardingKey;

public enum ActivityType implements ShardingKey {
    WALK,
    WATER,
    SLEEP
}