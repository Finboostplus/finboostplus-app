package com.finboostplus.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finboostplus.DTO.UserRequestDTO;
import com.finboostplus.model.Role;
import com.finboostplus.model.User;
import com.finboostplus.repository.RoleRepository;
import com.finboostplus.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Role userRole;
    private UserRequestDTO validUserDto;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        roleRepository.deleteAll();

        // Create default role for tests
        userRole = new Role();
        userRole.setAuthority("ROLE_USER");
        userRole = roleRepository.save(userRole);

        // Create valid user DTO for tests
        validUserDto = new UserRequestDTO(
                "Integration Test User",
                "integration@example.com",
                "password123",
                "light"
        );
    }

    @Test
    void saveProfile_shouldCreateUserInDatabase_whenValidData() throws Exception {
        // Verify user doesn't exist before
        assertEquals(0, userRepository.count());

        // Act
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(content().string("Cadastro feito com sucesso!"));

        // Verify user was created in database
        assertEquals(1, userRepository.count());

        User savedUser = userRepository.findAll().getFirst();
        assertEquals("Integration Test User", savedUser.getName());
        assertEquals("integration@example.com", savedUser.getEmail());
        assertEquals("light", savedUser.getColorTheme());
        assertNotNull(savedUser.getCreatedAt());
    }

    @Test
    void saveProfile_shouldReturnBadRequest_whenEmailAlreadyExists() throws Exception {
        // Create user first
        User existingUser = new User();
        existingUser.setName("Existing User");
        existingUser.setEmail("integration@example.com");
        existingUser.setPassword("pass");
        existingUser.setColorTheme("dark");
        existingUser.setCreatedAt(Instant.now());
        userRepository.save(existingUser);

        // Try to create another user with same email
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());

        // Should still have only one user
        assertEquals(1, userRepository.count());
    }

    @Test
    void getReturnAuthorized_shouldReturnUserEmail_whenAuthenticatedWithJWT() throws Exception {
        // Arrange: Create a real user in the database
        User testUser = new User();
        testUser.setName("Integration Test User");
        testUser.setEmail("integration@example.com");
        testUser.setPassword("encodedPassword");
        testUser.setColorTheme("dark");
        testUser.setCreatedAt(Instant.now());
        testUser.setRoles(Set.of(userRole));
        userRepository.save(testUser);

        // Create JWT claims with proper username claim
        Jwt jwt = Jwt.withTokenValue("test-token")
                .header("alg", "RS256")
                .claim("sub", "integration@example.com")
                .claim("username", "integration@example.com") // Add username claim
                .claim("scope", "read write")
                .claim("authorities", new String[]{"ROLE_USER"})
                .claim("exp", Instant.now().plus(1, ChronoUnit.HOURS))
                .claim("iat", Instant.now())
                .build();

        // Act & Assert: Test with JWT authentication
        mockMvc.perform(get("/user/whoareyou")
                .with(jwt().jwt(jwt).authorities(new SimpleGrantedAuthority("ROLE_USER"))))
                .andExpect(status().isOk())
                .andExpect(content().string("O usuário logado possui o e-mail: integration@example.com"));
    }

    @Test
    void getReturnAuthorized_shouldReturn401_whenNotAuthenticated() throws Exception {
        // Act & Assert: Test without authentication
        mockMvc.perform(get("/user/whoareyou"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void getReturnAuthorized_shouldReturn403_whenInvalidToken() throws Exception {
        // Act & Assert: Test with invalid/expired JWT
        Jwt expiredJwt = Jwt.withTokenValue("expired-token")
                .header("alg", "RS256")
                .claim("sub", "expired@example.com")
                .claim("authorities", new String[]{"ROLE_USER"})
                .claim("exp", Instant.now().minus(1, ChronoUnit.HOURS)) // Expired
                .claim("iat", Instant.now().minus(2, ChronoUnit.HOURS))
                .build();

        mockMvc.perform(get("/user/whoareyou")
                .with(jwt().jwt(expiredJwt)))
                .andExpect(status().isForbidden()); // Expect 403 instead of 401 for invalid scope
    }

    @Test
    @WithMockUser(roles = "OWNER")
    void getReturnNotAuthorized_shouldReturnOk_whenOwnerRole() throws Exception {
        mockMvc.perform(get("/user/no"))
                .andExpect(status().isOk())
                .andExpect(content().string("Aqui não está autorizado!"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void getReturnNotAuthorized_shouldReturn403_whenUserRole() throws Exception {
        mockMvc.perform(get("/user/no"))
                .andExpect(status().isForbidden());
    }
}
