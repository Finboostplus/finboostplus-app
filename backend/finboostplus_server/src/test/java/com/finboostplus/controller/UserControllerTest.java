package com.finboostplus.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finboostplus.DTO.UserCreateDTO;
import com.finboostplus.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.ActiveProfiles;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@ActiveProfiles("test")
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private OAuth2AuthorizationService authorizationService;

    @MockBean
    private JpaMetamodelMappingContext jpaMetamodelMappingContext; // Evita erro do EnableJpaAuditing em slice test

    @Autowired
    private ObjectMapper objectMapper;

    private UserCreateDTO validUserDto;
    private UserCreateDTO invalidUserDto;

    @BeforeEach
    void setUp() {
        validUserDto = new UserCreateDTO(
                "Test User",
                "test@example.com",
                "password123",
                "dark"
        );

        invalidUserDto = new UserCreateDTO(
                "",
                "invalid-email",
                "",
                "dark"
        );
    }

    @Test
    @WithMockUser
    void saveProfile_withValidData_shouldReturnCreated() throws Exception {
        // Arrange
        when(userService.saveUser(any(UserCreateDTO.class))).thenReturn(true);

        // Act & Assert
        mockMvc.perform(post("/user")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserDto)))
                .andExpect(status().isCreated())
                .andExpect(content().string("Cadastro feito com sucesso!"));
    }

    @Test
    @WithMockUser
    void saveProfile_withDuplicateEmail_shouldReturnBadRequest() throws Exception {
        // Arrange
        when(userService.saveUser(any(UserCreateDTO.class))).thenReturn(false);

        // Act & Assert
        mockMvc.perform(post("/user")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserDto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    void saveProfile_shouldReturnUnprocessableEntity_whenInvalidData() throws Exception {
        // Act & Assert
        mockMvc.perform(post("/user")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidUserDto)))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value(422))
                .andExpect(jsonPath("$.title").value("Erro de validação"))
                .andExpect(jsonPath("$.errors").isArray());
    }

    @Test
    @WithMockUser
    void saveProfile_shouldReturnBadRequest_whenMissingRequestBody() throws Exception {
        // Act & Assert
        mockMvc.perform(post("/user")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}
