package com.backend.auth_api.controllers;


import com.backend.auth_api.models.User;
import com.backend.auth_api.payload.request.EditRequest;
import com.backend.auth_api.payload.request.LoginRequest;
import com.backend.auth_api.payload.request.SignupRequest;
import com.backend.auth_api.payload.response.MessageResponse;
import com.backend.auth_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("isAuthenticated()")
    public Optional<User> user(@PathVariable("id") Long id) {
        return userRepository.findById(id);
    }

    @PostMapping("/user/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createUser(@Valid @RequestBody SignupRequest signUpRequest) {

        // username must be unique
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // email must be unique
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User Created successfully!"));
    }

    @PutMapping("/user/edit/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> editUser(@PathVariable("username") String username, @Valid @RequestBody EditRequest editRequest) {
        // if the user does not exist

        if (userRepository.existsByUsername(username)) {
            User user = userRepository.findByUsername(username).get();

            if (userRepository.existsByUsername(editRequest.getUsername()) && !user.getUsername().equals(editRequest.getUsername())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: UserName is already in use"));

            }
            else if (userRepository.existsByEmail(editRequest.getEmail()) && !user.getEmail().equals(editRequest.getEmail())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Email is already in use"));

            }

            user.setUsername(editRequest.getUsername());
            user.setEmail(editRequest.getEmail());
            userRepository.save(user);
            return ResponseEntity.ok(new MessageResponse("User updated successfully!"));

        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User does not exists"));
        }

    }


    @DeleteMapping("/user/delete/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
        if (userRepository.existsByUsername(username)){
            User user =  userRepository.findByUsername(username).get();
            userRepository.delete(user);
            return ResponseEntity.ok(new MessageResponse("User deleted successfully!"));
        }

        return ResponseEntity
                .badRequest()
                .body(new MessageResponse("Error: No such username!"));
    }

}
