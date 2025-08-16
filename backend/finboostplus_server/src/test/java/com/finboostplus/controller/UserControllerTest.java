package com.finboostplus.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finboostplus.DTO.UserRequestDTO;
import com.finboostplus.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserController.class, excludeAutoConfiguration = {
        org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class
})
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserRequestDTO validUserDto;
    private UserRequestDTO invalidUserDto;

    @BeforeEach
    void setUp() {
        validUserDto = new UserRequestDTO(
                "John Doe",
                "john.doe@example.com",
                "password123",
                "dark"
        );

        invalidUserDto = new UserRequestDTO(
                "", // nome inválido
                "invalid-email", // email inválido
                "123", // senha muito curta
                "blue"
        );
    }

    @Test
    void saveProfile_shouldReturnCreated_whenValidData() throws Exception {
        // Arrange
        when(userService.saveUser(any(UserRequestDTO.class))).thenReturn(true);

        // Act & Assert
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserDto)))
                .andExpect(status().isCreated())
                .andExpect(content().string("Cadastro feito com sucesso!"));
    }

    @Test
    void saveProfile_shouldReturnBadRequest_whenUserServiceFails() throws Exception {
        // Arrange
        when(userService.saveUser(any(UserRequestDTO.class))).thenReturn(false);

        // Act & Assert
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserDto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void saveProfile_shouldReturnUnprocessableEntity_whenInvalidData() throws Exception {
        // Act & Assert
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidUserDto)))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value(422))
                .andExpect(jsonPath("$.title").value("Erro de validação"))
                .andExpect(jsonPath("$.errors").isArray());
    }

    @Test
    void saveProfile_shouldReturnBadRequest_whenMissingRequestBody() throws Exception {
        // Act & Assert
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}
