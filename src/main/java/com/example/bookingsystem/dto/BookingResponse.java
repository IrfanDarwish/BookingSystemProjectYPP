package com.example.bookingsystem.dto;

import java.time.LocalDateTime;

import com.example.bookingsystem.model.BookingStatus;
import com.example.bookingsystem.model.EventStatus;

public class BookingResponse {

    private String bookingId;
    private String eventId;
    private String eventTitle;
    private Integer numberOfSeats;
    private Double totalPrice;
    private LocalDateTime bookingDate;
    private BookingStatus bookingStatus;
    private String userEmail;
    private String eventVenue;
    private EventStatus eventStatus;
    private LocalDateTime eventDate;

    public BookingResponse() {}

    public BookingResponse(String bookingId, String eventId, String eventTitle , Integer numberOfSeats, Double totalPrice, LocalDateTime bookingDate, BookingStatus bookingStatus, String userEmail, String eventVenue, EventStatus eventStatus, LocalDateTime eventDate) {
        this.bookingId = bookingId;
        this.eventId = eventId;
        this.numberOfSeats = numberOfSeats;
        this.totalPrice = totalPrice;
        this.bookingDate = bookingDate;
        this.bookingStatus = bookingStatus;
        this.userEmail = userEmail;
        this.eventTitle = eventTitle;
        this.eventVenue = eventVenue;
        this.eventStatus = eventStatus;
        this.eventDate = eventDate;
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

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
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

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }
    
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getEventVenue() {
        return eventVenue;
    }

    public void setEventVenue(String eventVenue) {
        this.eventVenue = eventVenue;
    }
    
    public EventStatus getEventStatus() {
        return eventStatus;
    }

    public void setEventStatus(EventStatus eventStatus) {
        this.eventStatus = eventStatus;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }
}
