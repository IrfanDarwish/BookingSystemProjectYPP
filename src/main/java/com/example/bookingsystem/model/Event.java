package com.example.bookingsystem.model;

import java.time.Instant;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public class Event {
    
    @Id
    private String id;

    @Indexed
    private String title;
    
    @Indexed
    private String description;

    @Indexed
    private String category;

    @Indexed
    private String venue;

    @Indexed
    private LocalDateTime eventDate;

    private Long price;

    private Integer capacity;

    private Integer seatsAvailable;

    @Indexed
    private String status;

    private Instant createdAt;
    
    public Event() {}

    public Event(String title, String description, String category, String venue, LocalDateTime eventDate, Long price, Integer capacity, Integer seatsAvailable, String status) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.venue = venue;
        this.eventDate = eventDate;
        this.price = price;
        this.capacity = capacity;
        this.seatsAvailable = seatsAvailable;
        this.status = status;
        this.createdAt = Instant.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getSeatsAvailable() {
        return seatsAvailable;
    }

    public void setSeatsAvailable(Integer seatsAvailable) {
        this.seatsAvailable = seatsAvailable;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    } 

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
