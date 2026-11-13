package com.pastryshop.identity_service.auth;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestAuthController {

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/api/client/test")
    public String clientTest() {
        return "Client access granted";
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/api/admin/test")
    public String adminTest() {
        return "Admin access granted";
    }
}