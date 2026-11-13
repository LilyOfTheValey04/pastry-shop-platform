package com.pastryshop.identity_service.auth;


import com.pastryshop.identity_service.auth.login.LoginRequest;
import com.pastryshop.identity_service.auth.register.RegisterRequest;
import com.pastryshop.identity_service.auth.update.UpdateProfileRequest;
import com.pastryshop.identity_service.auth.update.UpdateProfileResponse;
import com.pastryshop.identity_service.exception.EmailAlreadyExistsException;
import com.pastryshop.identity_service.exception.InvalidCredentialsException;
import com.pastryshop.identity_service.exception.UserNotFoundException;
import com.pastryshop.identity_service.security.JwtService;
import com.pastryshop.identity_service.user.User;
import com.pastryshop.identity_service.user.UserRepository;
import com.pastryshop.identity_service.user.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email()))
        {
            throw new EmailAlreadyExistsException("Email is already registered");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setRole(UserRole.CLIENT);
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.password(),
                user.getPassword())) {

            throw new InvalidCredentialsException("Invalid email or password");
        }

        return jwtService.generateToken(user.getEmail());
    }

    public long getExpirationTime() {
        return jwtService.getExpirationTime();
    }

    public UpdateProfileResponse updateProfile(
            String email,
            UpdateProfileRequest request
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User with email: '" + email + "' not found."));

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());

        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(
                    passwordEncoder.encode(request.password())
            );
        }

        User updatedUser = userRepository.save(user);

        return new UpdateProfileResponse(
                updatedUser.getId(),
                updatedUser.getEmail(),
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getRole(),
                updatedUser.getCreatedAt()
        );
    }

    public void deleteAccount(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User with email: '" + email + "' not found."));

        userRepository.delete(user);
    }

}