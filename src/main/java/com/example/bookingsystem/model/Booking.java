package com.example.bookingsystem.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookings")
public class Booking {
    
    @Id
    private String id;

    @Indexed
    private String userId;
    @Indexed
    private String eventId;

    private Integer numberOfSeats;

    private LocalDateTime bookingDate;

    private Long totalPrice;

    @Indexed
    private String bookingStatus;
    
    public Booking() {}

    public Booking(String userId, String eventId, Integer numberOfSeats, LocalDateTime bookingDate, Long totalPrice, String bookingStatus) {
        this.userId = userId;
        this.eventId = eventId;
        this.numberOfSeats = numberOfSeats;
        this.bookingDate = bookingDate;
        this.totalPrice = totalPrice;
        this.bookingStatus = bookingStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }    

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public Integer getNumberOfSeats() {
        return numberOfSeats;
    }

    public void setNumberOfSeats(Integer numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
}
