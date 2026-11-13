package com.pastryshop.identity_service.auth.update;

import com.pastryshop.identity_service.user.UserRole;

import java.time.LocalDateTime;

public record UpdateProfileResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        UserRole role,
        LocalDateTime createdAt) {
}