package com.example.bookingsystem.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookingsystem.dto.BookingRequest;
import com.example.bookingsystem.dto.BookingResponse;
import com.example.bookingsystem.service.BookingService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/create")
    public BookingResponse createBooking(@Valid @RequestBody BookingRequest bookingRequest, Authentication authentication) {
        String email = authentication.getName();
        
        return bookingService.createBooking(bookingRequest, email);
    }

    @PutMapping("/{bookingId}/cancel")
    public BookingResponse cancelBooking(@PathVariable String bookingId, Authentication authentication) {
        return bookingService.cancelBooking(bookingId, authentication.getName());
    }

    @GetMapping("/my-bookings")
    public List<BookingResponse> getBookingByUser(Authentication authentication) {
        return bookingService.getBookingsByEmail(authentication.getName());
    }

    @DeleteMapping("/{bookingId}/permanent")
    public void deleteBooking(@PathVariable String bookingId, Authentication authentication) {
        bookingService.deleteBooking(bookingId, authentication.getName());
    }
    
}
