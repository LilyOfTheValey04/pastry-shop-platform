package com.pastryshop.business_service.security;

public record AuthenticatedUser(Long userId, String email, String role) {
}
