package com.example.bookingsystem.dto;

import java.time.LocalDateTime;

import com.example.bookingsystem.model.EventStatus;

public class EventRequest {
    private String title;
    private String description;
    private String category;
    private String venue;
    private LocalDateTime eventDate;
    private Double price;
    private Integer capacity;
    private EventStatus status;

    public EventRequest() {}

    public EventRequest(String title, String description, String category, String venue, LocalDateTime eventDate, Double price, Integer capacity, EventStatus status) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.venue = venue;
        this.eventDate = eventDate;
        this.price = price;
        this.capacity = capacity;
        this.status = status;
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

    public EventStatus getStatus() {
        return status;
    }


    public void setStatus(EventStatus status) {
        this.status = status;
    }
}
