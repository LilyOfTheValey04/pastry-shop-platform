package com.pastryshop.identity.service.auth.login;

public record LoginResponse(
        String token,
        long expiresIn
) {

}
