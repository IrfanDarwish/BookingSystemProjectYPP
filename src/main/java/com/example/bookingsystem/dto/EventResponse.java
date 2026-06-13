package com.example.bookingsystem.dto;

import java.time.Instant;
import java.time.LocalDateTime;

import com.example.bookingsystem.model.Event;
import com.example.bookingsystem.model.EventStatus;

public class EventResponse {
    private String id;
    private String title;
    private String description;
    private String category;
    private String venue;
    private LocalDateTime eventDate;
    private Double price;
    private Integer capacity;
    private Integer seatsAvailable;
    private EventStatus status;
    private Instant createdAt;

    public EventResponse() {}

    public EventResponse(Event event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.category = event.getCategory();
        this.venue = event.getVenue();
        this.eventDate = event.getEventDate();
        this.price = event.getPrice();
        this.capacity = event.getCapacity();
        this.seatsAvailable = event.getSeatsAvailable();
        this.status = event.getStatus();
        this.createdAt = event.getCreatedAt();
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
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

    public EventStatus getStatus() {
        return status;
    }

    public void setStatus(EventStatus status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
