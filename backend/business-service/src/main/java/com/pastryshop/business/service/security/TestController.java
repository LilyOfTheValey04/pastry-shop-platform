package com.pastryshop.business.service.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("/whoami")
    public AuthenticatedUser whoami(@AuthenticationPrincipal AuthenticatedUser user){
        return user;
    }
}
