package com.example.bookingsystem.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookingsystem.service.BookingService;
import com.example.bookingsystem.service.EventService;
import com.example.bookingsystem.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final EventService eventService;
    private final BookingService bookingService;
    private final UserService userService;

    public AdminController(EventService eventService, BookingService bookingService, UserService userService) {
        this.eventService = eventService;
        this.bookingService = bookingService;
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/dashboard/summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary() {
        
        Map<String, Object> summary = new HashMap<>();

        summary.put("totalEvents", eventService.countEvents());
        summary.put("totalBookings", bookingService.countBookings());
        summary.put("totalUsers", userService.countUsers());
        summary.put("eventStatusSummary", eventService.getEventStatusSummary());
        summary.put("todaysBookings", bookingService.countTodaysBookings());
        summary.put("totalSeatsBooked", bookingService.countTotalSeatsBooked());
        summary.put("mostPopularEvents", bookingService.getMostPopularEvents());
        summary.put("todaysRevenue", bookingService.getTodaysRevenue());
        summary.put("totalRevenue", bookingService.getTotalRevenue());

        return ResponseEntity.ok(summary);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/bookings/recent")
    public ResponseEntity<?> getRecentBookings() {
        return ResponseEntity.ok(bookingService.getRecentBookings());
    }
    
}
