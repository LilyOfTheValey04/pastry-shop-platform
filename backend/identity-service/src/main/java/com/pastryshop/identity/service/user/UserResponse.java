package com.pastryshop.identity.service.user;

public record UserResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        UserRole role
) {
}
