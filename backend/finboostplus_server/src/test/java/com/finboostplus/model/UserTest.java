package com.finboostplus.model;

import com.finboostplus.DTO.UserRequestDTO;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void dtoToUser_shouldConvertCorrectly() {
        // Arrange
        UserRequestDTO dto = new UserRequestDTO("Alice", "alice@example.com", "12345", "dark");

        // Act
        User user = User.dtoToUser(dto);

        // Assert
        assertEquals("Alice", user.getName());
        assertEquals("alice@example.com", user.getEmail());
        assertEquals("12345", user.getPassword());
        assertEquals("dark", user.getColorTheme());
        assertNotNull(user.getCreatedAt());
    }

    @Test
    void addRole_and_hasRole_shouldWork() {
        // Arrange
        User user = new User("Bob", "bob@example.com", "pass", "light");

        // Act
        Role roleAdmin = new Role(1L, "ROLE_ADMIN");

        // Assert
        assertFalse(user.hasRole("ROLE_ADMIN"));

        // Add role
        user.addRole(roleAdmin);

        // Assert
        assertTrue(user.hasRole("ROLE_ADMIN"));
        assertTrue(user.getAuthorities().contains(roleAdmin));
    }

    @Test
    void getUsername_shouldReturnEmail() {
        // Arrange
        User user = new User("Charlie", "charlie@example.com", "pass", "light");

        // Act & Assert
        assertEquals("charlie@example.com", user.getUsername());
    }

    @Test
    void equals_and_hashCode_shouldWorkCorrectly() {
        // Arrange
        User user1 = new User("Dave", "dave@example.com", "pass", "light");
        User user2 = new User("Eve", "eve@example.com", "pass", "dark");

        // Act
        user1.setId(1L);
        user2.setId(1L);

        // Assert
        assertEquals(user1, user2);
        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    void userDetailsMethods_shouldReturnTrue() {
        // Arrange
        User user = new User("Frank", "frank@example.com", "pass", "light");

        // Act & Assert
        assertTrue(user.isAccountNonExpired());
        assertTrue(user.isAccountNonLocked());
        assertTrue(user.isCredentialsNonExpired());
        assertTrue(user.isEnabled());
    }
}
