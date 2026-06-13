package com.example.bookingsystem.service;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.bookingsystem.dto.EventRequest;
import com.example.bookingsystem.dto.EventResponse;
import com.example.bookingsystem.model.Booking;
import com.example.bookingsystem.model.BookingStatus;
import com.example.bookingsystem.model.Event;
import com.example.bookingsystem.model.EventStatus;
import com.example.bookingsystem.repository.BookingRepository;
import com.example.bookingsystem.repository.EventRepository;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;
    
    public EventService(EventRepository eventRepository, BookingRepository bookingRepository) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll()
        .stream()
        .map(EventResponse::new)
        .toList();
    }

    public EventResponse getEventById(String id) {
        Event event = eventRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        return new EventResponse(event);
    }

    public EventResponse createEvent(EventRequest eventReq) {
        
        Event event = new Event();

        event.setTitle(eventReq.getTitle());
        event.setDescription(eventReq.getDescription());
        event.setCategory(eventReq.getCategory());
        event.setVenue(eventReq.getVenue());
        event.setEventDate(eventReq.getEventDate());
        event.setPrice(eventReq.getPrice());
        event.setCapacity(eventReq.getCapacity());
        event.setSeatsAvailable(eventReq.getCapacity());
        event.setStatus(EventStatus.UPCOMING);
        event.setCreatedAt(Instant.now());

        Event saved = eventRepository.save(event);

        return new EventResponse(saved);
    }

    public List<EventResponse> createBulkEvents(List<EventRequest> requests) {

        List<Event> events = requests.stream().map(request -> {

            Event event = new Event();

            event.setTitle(request.getTitle());
            event.setDescription(request.getDescription());
            event.setCategory(request.getCategory());
            event.setVenue(request.getVenue());
            event.setEventDate(request.getEventDate());
            event.setPrice(request.getPrice());
            event.setCapacity(request.getCapacity());
            event.setStatus(request.getStatus());
            event.setCreatedAt(Instant.now());
            event.setSeatsAvailable(
                    request.getCapacity() != null ? request.getCapacity() : 0
            );
            return event;
        }).toList();

        return eventRepository.saveAll(events)
                .stream()
                .map(EventResponse::new)
                .toList();
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }

    public EventResponse updateEvent(String id, EventRequest eventReq) {
        
        Event event = eventRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        event.setTitle(eventReq.getTitle());
        event.setDescription(eventReq.getDescription());
        event.setCategory(eventReq.getCategory());
        event.setVenue(eventReq.getVenue());
        event.setEventDate(eventReq.getEventDate());
        event.setPrice(eventReq.getPrice());
        event.setCapacity(eventReq.getCapacity());
        
        if (eventReq.getStatus() != null) {
            event.setStatus(eventReq.getStatus());
        }

        Event saved = eventRepository.save(event);

        return new EventResponse(saved);
    }


    public long countEvents() {
        return eventRepository.count();
    }

    public Map<String, Long> getEventStatusSummary() {
        Map<String, Long> map = new HashMap<>();

        map.put("upcoming", eventRepository.countByStatus(EventStatus.UPCOMING));
        map.put("active", eventRepository.countByStatus(EventStatus.ACTIVE));
        map.put("completed", eventRepository.countByStatus(EventStatus.COMPLETED));
        map.put("cancelled", eventRepository.countByStatus(EventStatus.CANCELLED));

        return map;
    }

    @Transactional
    public EventResponse cancelEvent(String eventId) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        if (event.getStatus() == EventStatus.CANCELLED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event already cancelled");
        }

        event.setStatus(EventStatus.CANCELLED);
        
        List<Booking> bookings = bookingRepository.findByEventId(eventId);
        for (Booking booking : bookings) {
            if (booking.getBookingStatus() != BookingStatus.CANCELLED) {
                booking.setBookingStatus(BookingStatus.CANCELLED);
            }
        }
        bookingRepository.saveAll(bookings);

        event.setSeatsAvailable(event.getCapacity());

        eventRepository.save(event);
        
        return new EventResponse(event);
    }

    public Page<Event> getAllEvents(String search, Pageable pageable) {
        
        if (search != null) {
            return eventRepository.findByTitleContainingIgnoreCase(search, pageable);
        }
        return eventRepository.findAll(pageable);
    }
}
