package com.pastryshop.business.service.security;

public record AuthenticatedUser(Long userId, String email, String role) {
}
