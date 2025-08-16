package com.finboostplus.repository;

import com.finboostplus.model.Role;
import com.finboostplus.model.User;
import com.finboostplus.projection.UserDetailsProjection;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    void searchUserAndRolesByEmail_shouldReturnUserWithRoles() {
        // Arrange
        Role role = new Role();
        role.setAuthority("ROLE_USER");
        entityManager.persist(role);

        User user = new User();
        user.setName("Test User");
        user.setEmail("test@test.com");
        user.setPassword("hashedPassword");
        user.setColorTheme("dark"); // Fix: Use setColorTheme instead of setTheme
        user.setCreatedAt(Instant.now()); // Fix: Set createdAt

        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);

        entityManager.persist(user);
        entityManager.flush();

        // Act
        List<UserDetailsProjection> result = userRepository.searchUserAndRolesByEmail("test@test.com");

        // Assert
        assertFalse(result.isEmpty());
        assertEquals("test@test.com", result.get(0).getUsername());
        assertEquals("hashedPassword", result.get(0).getPassword());
        assertEquals("ROLE_USER", result.get(0).getAuthority());
        assertNotNull(result.get(0).getRoleId());
    }

    @Test
    void searchUserAndRolesByEmail_shouldReturnEmptyForNonExistentEmail() {
        // Act
        List<UserDetailsProjection> result = userRepository.searchUserAndRolesByEmail("nonexistent@test.com");

        // Assert
        assertTrue(result.isEmpty());
    }

    @Test
    void findByEmailIgnoreCase_shouldFindUserIgnoringCase() {
        // Arrange
        User user = new User();
        user.setName("Test User");
        user.setEmail("Test@Example.COM");
        user.setPassword("password");
        user.setColorTheme("light"); // Fix: Use setColorTheme instead of setTheme
        user.setCreatedAt(Instant.now()); // Fix: Set createdAt
        entityManager.persist(user);
        entityManager.flush();

        // Act & Assert
        assertTrue(userRepository.findByEmailIgnoreCase("test@example.com").isPresent());
        assertTrue(userRepository.findByEmailIgnoreCase("TEST@EXAMPLE.COM").isPresent());
        assertFalse(userRepository.findByEmailIgnoreCase("notfound@test.com").isPresent());
    }
}
