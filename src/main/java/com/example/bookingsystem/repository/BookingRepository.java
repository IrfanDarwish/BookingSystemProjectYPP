package com.example.bookingsystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.bookingsystem.model.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List <Booking> findByUserId(String userId);
    List <Booking> findByEventId(String eventId);
}
