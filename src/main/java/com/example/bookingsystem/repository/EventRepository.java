package com.example.bookingsystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.bookingsystem.model.Event;

public interface EventRepository extends MongoRepository<Event, String> {
    
}
