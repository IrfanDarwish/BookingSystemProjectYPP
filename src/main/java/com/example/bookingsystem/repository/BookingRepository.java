package com.example.bookingsystem.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.bookingsystem.model.Booking;
import com.example.bookingsystem.model.BookingStatus;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List <Booking> findByUserId(String userId);
    List <Booking> findByEventId(String eventId);

    List<Booking> findTop10ByOrderByBookingDateDesc();

    long countByBookingStatusNot(BookingStatus status);

    long countByBookingDateBetweenAndBookingStatusNot(Instant start, Instant end, BookingStatus status);

    @Aggregation(pipeline = {
            "{ $match: { 'bookingStatus': { $ne: ?0 } } }",
            "{ $group: { _id: null, total: { $sum: '$numberOfSeats' } } }"
    })
    Long sumNumberOfSeatsByBookingStatusNot(BookingStatus status);
}
