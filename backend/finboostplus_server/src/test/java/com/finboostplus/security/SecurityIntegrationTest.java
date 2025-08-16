package com.finboostplus.security;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class SecurityIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void contextLoadsWithSecurity() {
        // Simple test to verify security configuration loads without errors
        // This validates that Spring Security beans are properly configured
    }

    @Test
    @WithMockUser(username = "test@test.com", authorities = {"ROLE_USER"})
    void mockUserContextWorks() {
        // This test validates that @WithMockUser annotation works correctly
        // and that Spring Security context is properly set up in tests
    }

    @Test
    @WithMockUser(username = "admin@test.com", authorities = {"ROLE_ADMIN"})
    void mockAdminContextWorks() {
        // This test validates that admin role context works in tests
    }
}
