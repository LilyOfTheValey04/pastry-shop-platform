package com.pastryshop.identity.service.user;

import com.pastryshop.identity.service.user.update.UpdateProfileRequest;
import com.pastryshop.identity.service.user.update.UpdateProfileResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {

        return ResponseEntity.ok(userService.getCurrentUser(authentication));
    }

    @Transactional
    @SecurityRequirement(name = "bearerAuth")
    @PutMapping("/me")
    public ResponseEntity<UpdateProfileResponse> updateProfile(Authentication authentication, @Valid @RequestBody UpdateProfileRequest request) {

        String email = authentication.getName();

        UpdateProfileResponse updatedUser = userService.updateProfile(email, request);

        return ResponseEntity.ok(updatedUser);
    }

    @Transactional
    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteAccount(Authentication authentication) {

        String email = authentication.getName();

        userService.deleteAccount(email);

//        return ResponseEntity.noContent().build();
        return ResponseEntity.status(200).build();
    }
}
