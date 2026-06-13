package com.example.bookingsystem.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.bookingsystem.dto.AuthResponse;
import com.example.bookingsystem.dto.LoginRequest;
import com.example.bookingsystem.dto.RegisterRequest;
import com.example.bookingsystem.service.AuthService;

import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@CrossOrigin(origins = "http://localhost:5173")
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

    @Value("${admin.secret}")
    private String adminSecret;

    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest registerRequest, @RequestHeader("ADMIN-SECRET") String secret) {
        if (!adminSecret.equals(secret)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid admin secret");
        }

        authService.registerAdmin(registerRequest);
        return ResponseEntity.ok("ADMIN registered successfully");

    }

    @PostMapping("/login")
    public AuthResponse loginUser(@Valid @RequestBody LoginRequest logRequest) {
        return authService.loginUser(logRequest);
    }
    
}
