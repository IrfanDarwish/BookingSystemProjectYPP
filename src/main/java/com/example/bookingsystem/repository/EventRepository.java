package com.example.bookingsystem.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.bookingsystem.model.Event;
import com.example.bookingsystem.model.EventStatus;

public interface EventRepository extends MongoRepository<Event, String> {
    long countByStatus(EventStatus status);

    Page<Event> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
