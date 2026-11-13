package com.pastryshop.identity_service.auth.login;

public record LoginResponse(
        String token,
        long expiresIn
) {

}
