package com.pastryshop.identity.service.user;

import com.pastryshop.identity.service.exception.UserNotFoundException;
import com.pastryshop.identity.service.user.update.UpdateProfileRequest;
import com.pastryshop.identity.service.user.update.UpdateProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse getCurrentUser(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole()
        );
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public void deleteAccount(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User with email: '" + email + "' not found."));

        userRepository.delete(user);
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

}