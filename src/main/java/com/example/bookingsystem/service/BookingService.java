package com.example.bookingsystem.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.bookingsystem.dto.BookingRequest;
import com.example.bookingsystem.dto.BookingResponse;
import com.example.bookingsystem.model.Booking;
import com.example.bookingsystem.model.BookingStatus;
import com.example.bookingsystem.model.Event;
import com.example.bookingsystem.model.EventStatus;
import com.example.bookingsystem.model.Role;
import com.example.bookingsystem.model.User;
import com.example.bookingsystem.repository.BookingRepository;
import com.example.bookingsystem.repository.EventRepository;
import com.example.bookingsystem.repository.UserRepository;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, EventRepository eventRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public BookingResponse createBooking(BookingRequest bookingRequest, String email) {
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = eventRepository.findById(bookingRequest.getEventId())
            .orElseThrow(()-> new RuntimeException("Event not found")) ;

        if (event.getSeatsAvailable() < bookingRequest.getNumberOfSeats()) {
            throw new RuntimeException("Not enough seats available");
        }

        if (bookingRequest.getNumberOfSeats() <= 0) {
            throw new RuntimeException("Invalid number of seats. Minimum number of seats is 1.");
        }

        Double totalPrice = event.getPrice() * bookingRequest.getNumberOfSeats();

        event.setSeatsAvailable(event.getSeatsAvailable() - bookingRequest.getNumberOfSeats());

        eventRepository.save(event);

        Booking booking = new Booking();
        booking.setUserId(user.getId());
        booking.setEventId(event.getId());
        booking.setNumberOfSeats(bookingRequest.getNumberOfSeats());
        booking.setBookingDate(LocalDateTime.now());
        booking.setTotalPrice(totalPrice);
        booking.setBookingStatus(BookingStatus.CONFIRMED);

        Booking savedBooking = bookingRepository.save(booking);
        
        return new BookingResponse(
            savedBooking.getId(),
            savedBooking.getEventId(),
            event.getTitle(),
            savedBooking.getNumberOfSeats(),
            savedBooking.getTotalPrice(),
            savedBooking.getBookingDate(),
            savedBooking.getBookingStatus(),
            user.getEmail(),
            event.getVenue(),
            event.getStatus(),
            event.getEventDate()
        );
    }

    public List<BookingResponse> getBookingsByEmail(String email) {
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByUserId(user.getId())
            .stream()
            .map(booking -> {
                Event event = eventRepository.findById(booking.getEventId()).orElse(null);

                return new BookingResponse(
                    booking.getId(),
                    booking.getEventId(),
                    event != null ? event.getTitle() : "Event Deleted",
                    booking.getNumberOfSeats(),
                    booking.getTotalPrice(),
                    booking.getBookingDate(),
                    booking.getBookingStatus(),
                    user.getEmail(),
                    event != null ? event.getVenue() : null,
                    event != null ? event.getStatus() : null,
                    event != null ? event.getEventDate() : null
                );
            })
            .toList();
    }   

    public BookingResponse cancelBooking(String bookingId, String email) {
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        if(!booking.getUserId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to cancel this booking");
        }

        Event event = eventRepository.findById(booking.getEventId())
            .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setSeatsAvailable(event.getSeatsAvailable() + booking.getNumberOfSeats());

        eventRepository.save(event);

        booking.setBookingStatus(BookingStatus.CANCELLED);

        bookingRepository.save(booking);

        return new BookingResponse(
            booking.getId(),
            booking.getEventId(),
            event.getTitle(),
            booking.getNumberOfSeats(),
            booking.getTotalPrice(),
            booking.getBookingDate(),
            booking.getBookingStatus(),
            user.getEmail(),
            event.getVenue(),
            event.getStatus(),
            event.getEventDate()
        );
    }

    public List<BookingResponse> getAllBookings(String email) {

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if(user.getRole().equals(Role.ADMIN)) {
            return bookingRepository.findAll()
                .stream()
                .map(booking -> {
                    Event event = eventRepository.findById(booking.getEventId()).orElse(null);
                    User bookingUser = userRepository.findById(booking.getUserId()).orElse(null);

                    return new BookingResponse(
                        booking.getId(),
                        booking.getEventId(),
                        event != null ? event.getTitle() : "Event Deleted",
                        booking.getNumberOfSeats(),
                        booking.getTotalPrice(),
                        booking.getBookingDate(),
                        booking.getBookingStatus(),
                        bookingUser != null ? bookingUser.getEmail() : "Unknown",
                        event != null ? event.getVenue() : null,
                        event != null ? event.getStatus() : null,
                        event != null ? event.getEventDate() : null
                    );
                })
                .toList();
        } else {
            throw new RuntimeException("Unauthorized to view all bookings");
        }
    }


    public long countBookings() {
        return bookingRepository.count();
    }

    public long countTotalSeatsBooked() {
        Long total = bookingRepository.sumNumberOfSeatsByBookingStatusNot(BookingStatus.CANCELLED);
        return total != null ? total : 0L;
    }

    public long countTodaysBookings() {
        LocalDate today = LocalDate.now();
        Instant startOfDay = today.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant endOfDay = today.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
        
        return bookingRepository.countByBookingDateBetweenAndBookingStatusNot(
            startOfDay, endOfDay, BookingStatus.CANCELLED
        );
    }

    public String getMostPopularEvents() {

        Map<String, Long> eventCounts = bookingRepository.findAll()
            .stream()
            .collect(Collectors.groupingBy(Booking::getEventId, Collectors.counting()));

        String topEventId = eventCounts.entrySet()
            .stream()
            .max(Map.Entry.comparingByValue())
            .map(Map.Entry::getKey)
            .orElse(null);

        if (topEventId == null) {
            return "No events found.";
        }

        return eventRepository.findById(topEventId)
            .map(Event::getTitle)
            .orElse("Event not found.");
    }


    public List<BookingResponse> getRecentBookings() {

        return bookingRepository.findTop10ByOrderByBookingDateDesc()
            .stream()
            .map(booking -> {

                Event event = eventRepository.findById(booking.getEventId())
                    .orElse(null);

                User bookingUser = userRepository.findById(booking.getUserId())
                    .orElse(null);

                return new BookingResponse(
                    booking.getId(),
                    booking.getEventId(),
                    event != null ? event.getTitle() : "Event Deleted",
                    booking.getNumberOfSeats(),
                    booking.getTotalPrice(),
                    booking.getBookingDate(),
                    booking.getBookingStatus(),
                    bookingUser != null ? bookingUser.getEmail() : "Unknown",
                    event != null ? event.getVenue() : null,
                    event != null ? event.getStatus() : null,
                    event != null ? event.getEventDate() : null
                );
            })
            .toList();
    }

    public Double getTodaysRevenue(){

        LocalDate today = LocalDate.now();

        return bookingRepository.findAll()
            .stream()
            .filter(b -> b.getBookingStatus() == BookingStatus.CONFIRMED)
            .filter(b -> b.getBookingDate().toLocalDate().equals(today))
            .mapToDouble(Booking::getTotalPrice)
            .sum();
    }


    public Double getTotalRevenue() {

        return bookingRepository.findAll()
        .stream()
        .filter(b -> b.getBookingStatus() == BookingStatus.CONFIRMED)
        .mapToDouble(Booking::getTotalPrice)
        .sum();
    }

    public void deleteBooking(String bookingId, String email) {

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        if(!booking.getUserId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this booking");
        }

        Event event = eventRepository.findById(booking.getEventId())
            .orElseThrow(() -> new RuntimeException("Event not found"));

        boolean bookingCancelled = booking.getBookingStatus() == BookingStatus.CANCELLED;
        boolean eventCancelled = event.getStatus() == EventStatus.CANCELLED;

        if (!bookingCancelled && !eventCancelled) {
            throw new RuntimeException("Cannot delete a confirmed booking. Please cancel the booking first.");
        }

        bookingRepository.deleteById(bookingId);
    }

}
