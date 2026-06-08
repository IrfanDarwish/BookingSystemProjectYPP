package com.example.bookingsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.bookingsystem.model.User;
import com.example.bookingsystem.repository.UserRepository;

@Service
public class UserService {
    
    public final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(String id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setFullName(updatedUser.getFullName());
        existingUser.setEmail(updatedUser.getEmail());
        return userRepository.save(existingUser);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }


}
