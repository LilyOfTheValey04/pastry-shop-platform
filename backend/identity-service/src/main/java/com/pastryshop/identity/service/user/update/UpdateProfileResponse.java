package com.pastryshop.identity.service.user.update;

import com.pastryshop.identity.service.user.UserRole;

import java.time.LocalDateTime;

public record UpdateProfileResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        UserRole role,
        LocalDateTime createdAt) {
}