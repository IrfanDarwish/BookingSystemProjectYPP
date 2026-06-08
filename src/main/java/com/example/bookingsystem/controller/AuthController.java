package com.example.bookingsystem.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookingsystem.dto.AuthResponse;
import com.example.bookingsystem.dto.LoginRequest;
import com.example.bookingsystem.dto.RegisterRequest;
import com.example.bookingsystem.service.AuthService;

import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> registerUser(@Valid @RequestBody RegisterRequest regRequest) {
        authService.registerUser(regRequest);
        return Map.of("message", "User registered successfully");
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@Valid @RequestBody LoginRequest logRequest) {
        return authService.loginUser(logRequest);
    }
    
}
