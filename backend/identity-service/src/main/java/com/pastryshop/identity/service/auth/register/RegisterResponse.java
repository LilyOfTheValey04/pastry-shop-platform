package com.pastryshop.identity.service.auth.register;

import com.pastryshop.identity.service.user.UserRole;

import java.time.LocalDateTime;

public record RegisterResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        UserRole role,
        LocalDateTime createdAt
) {
}