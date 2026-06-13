package com.example.bookingsystem.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.example.bookingsystem.dto.EventRequest;
import com.example.bookingsystem.dto.EventResponse;
import com.example.bookingsystem.model.Event;
import com.example.bookingsystem.service.EventService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/events")
public class EventController {
    
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/{id}")
    public EventResponse getEventById(@PathVariable String id) {
        return eventService.getEventById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public EventResponse createEvent(@Valid@RequestBody EventRequest request) {
        return eventService.createEvent(request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/bulk")
    public List<EventResponse> createBulkEvents(@Valid @RequestBody List<EventRequest> requests) {
        return eventService.createBulkEvents(requests);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public EventResponse updateEvent(@PathVariable String id, @Valid @RequestBody EventRequest request) {
        return eventService.updateEvent(id, request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/cancel")
    public ResponseEntity<EventResponse> cancelEvent(@PathVariable("id") String eventId) {
        return ResponseEntity.ok(eventService.cancelEvent(eventId));
    }
    
    @GetMapping
    public Page<Event> getAllEvents(@RequestParam(required = false) String search, Pageable pageable) {
        return eventService.getAllEvents(search, pageable);
    }
    
}
