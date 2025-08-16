package com.finboostplus.service;

import com.finboostplus.DTO.UserRequestDTO;
import com.finboostplus.exception.EmailAlreadyRegisteredException;
import com.finboostplus.model.Role;
import com.finboostplus.model.User;
import com.finboostplus.projection.UserDetailsProjection;
import com.finboostplus.repository.RoleRepository;
import com.finboostplus.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    RoleRepository roleRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @Spy
    @InjectMocks
    UserService userService;

    @Test
    void loadUserByUsername_success() {
        // Arrange
        UserDetailsProjection projection = mock(UserDetailsProjection.class);
        when(projection.getUsername()).thenReturn("test@test.com");
        when(projection.getPassword()).thenReturn("hashedPassword");
        when(projection.getRoleId()).thenReturn(1L);
        when(projection.getAuthority()).thenReturn("ROLE_USER");
        when(userRepository.searchUserAndRolesByEmail("test@test.com"))
                .thenReturn(List.of(projection));

        // Act
        UserDetails userDetails = userService.loadUserByUsername("test@test.com");

        // Assert
        assertEquals("test@test.com", userDetails.getUsername());
        assertEquals("hashedPassword", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_USER")));
    }

    @Test
    void loadUserByUsername_notFound() {
        // Arrange
        when(userRepository.searchUserAndRolesByEmail("nonexistent@test.com"))
                .thenReturn(List.of());

        // Act & Assert
        assertThrows(UsernameNotFoundException.class,
                () -> userService.loadUserByUsername("nonexistent@test.com"));
    }

    @Test
    void saveUser_emailAlreadyExists() {
        // Arrange
        when(userRepository.findByEmailIgnoreCase("existing@test.com"))
                .thenReturn(Optional.of(new User()));
        UserRequestDTO dto = new UserRequestDTO("Test User", "existing@test.com", "password123", "dark");

        // Act & Assert
        assertThrows(EmailAlreadyRegisteredException.class,
                () -> userService.saveUser(dto));
    }

    @Test
    void saveUser_success() {
        // Arrange
        when(userRepository.findByEmailIgnoreCase("new@test.com"))
                .thenReturn(Optional.empty());
        Role role = new Role(1L, "ROLE_USER");
        when(roleRepository.findByAuthority("ROLE_USER")).thenReturn(role);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        doReturn(passwordEncoder).when(userService).passwordEncoder(); // Mock the method
        User savedUser = new User();
        savedUser.setId(10L);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        UserRequestDTO dto = new UserRequestDTO("Test User", "new@test.com", "password123", "dark");

        // Act
        boolean result = userService.saveUser(dto);

        // Assert
        assertTrue(result);
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(argThat(user ->
                user.getRoles().stream().anyMatch(r -> r.getAuthority().equals("ROLE_USER")) &&
                user.getPassword().equals("encodedPassword")
        ));
    }
}