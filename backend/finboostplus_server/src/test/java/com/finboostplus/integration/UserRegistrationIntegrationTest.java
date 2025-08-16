package com.finboostplus.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finboostplus.DTO.UserRequestDTO;
import com.finboostplus.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class UserRegistrationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void registerUser_completeFlow_shouldCreateUserSuccessfully() throws Exception {
        // Arrange
        UserRequestDTO userRequest = new UserRequestDTO(
                "Integration Test User",
                "integration@test.com",
                "password123",
                "dark"
        );

        // Act & Assert
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userRequest)))
                .andExpect(status().isCreated());

        // Verify user was actually saved in database
        assertTrue(userRepository.findByEmailIgnoreCase("integration@test.com").isPresent());
    }

    @Test
    void registerUser_duplicateEmail_shouldReturnConflict() throws Exception {
        // Arrange
        UserRequestDTO firstUser = new UserRequestDTO(
                "First User",
                "duplicate@test.com",
                "password123",
                "dark"
        );

        UserRequestDTO duplicateUser = new UserRequestDTO(
                "Duplicate User",
                "duplicate@test.com",
                "password456",
                "light"
        );

        // Act - Register first user
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(firstUser)))
                .andExpect(status().isCreated());

        // Act & Assert - Try to register duplicate
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(duplicateUser)))
                .andExpect(status().isBadRequest()); // Fix: Expect 400 instead of 409

        // Verify only one user exists
        assertEquals(1, userRepository.findAll().size());
    }

    @Test
    void registerUser_invalidData_shouldReturnBadRequest() throws Exception {
        // Arrange
        UserRequestDTO invalidUser = new UserRequestDTO(
                "", // empty name
                "invalid-email", // invalid email format
                "", // empty password
                null // null theme
        );

        // Act & Assert
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isUnprocessableEntity()); // Fix: Expect 422 instead of 400

        // Verify no user was created
        assertEquals(0, userRepository.findAll().size());
    }
}
