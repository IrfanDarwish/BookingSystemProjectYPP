package com.example.bookingsystem.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookingsystem.dto.BookingRequest;
import com.example.bookingsystem.dto.BookingResponse;
import com.example.bookingsystem.service.BookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/create")
    public BookingResponse createBooking(@Valid @RequestBody BookingRequest bookingRequest, @RequestParam String email) {
        return bookingService.createBooking(bookingRequest, email);
    }

    @PostMapping("/cancel")
    public void cancelBooking(@Valid @RequestParam String bookingId, @RequestParam String email) {
        bookingService.cancelBooking(bookingId, email);
    }

    @GetMapping("/my-bookings")
    public List<BookingResponse> getBookingByUser(String email){
        return bookingService.getBookingsByUserId(email);
    }
    
}
