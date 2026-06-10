package com.example.bookingsystem.dto;

import java.time.LocalDateTime;

import com.example.bookingsystem.model.BookingStatus;

public class BookingResponse {

    private String bookingId;
    private String eventId;
    private String eventTitle;
    private Integer numberOfSeats;
    private Long totalPrice;
    private LocalDateTime bookingDate;
    private BookingStatus bookingStatus;

    public BookingResponse() {}

    public BookingResponse(String bookingId, String eventId, String eventTitle , Integer numberOfSeats, Long totalPrice, LocalDateTime bookingDate, BookingStatus bookingStatus) {
        this.bookingId = bookingId;
        this.eventId = eventId;
        this.numberOfSeats = numberOfSeats;
        this.totalPrice = totalPrice;
        this.bookingDate = bookingDate;
        this.bookingStatus = bookingStatus;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
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

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public BookingStatus getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(BookingStatus bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
    
}
