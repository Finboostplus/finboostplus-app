package com.finboostplus.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class RoleTest {

    @Test
    void getAuthority_shouldReturnCorrectValue() {
        // Arrange
        Role role = new Role(1L, "ROLE_ADMIN");

        // Act & Assert
        assertEquals("ROLE_ADMIN", role.getAuthority());
    }

    @Test
    void equals_and_hashCode_shouldUseAuthority() {
        // Arrange
        Role role1 = new Role(1L, "ROLE_USER");
        Role role2 = new Role(2L, "ROLE_USER");
        Role role3 = new Role(3L, "ROLE_ADMIN");

        // Assert
        // Same authority → considered equal
        assertEquals(role1, role2);
        assertEquals(role1.hashCode(), role2.hashCode());

        // Assert
        // Different authority → not equal
        assertNotEquals(role1, role3);
    }

    @Test
    void equals_shouldReturnFalseForNullOrDifferentType() {
        // Arrange
        Role role = new Role(1L, "ROLE_USER");

        // Act & Assert
        assertNotEquals(null, role);
        assertNotEquals("ROLE_USER", role); // different type
    }

    @Test
    void equals_shouldReturnTrueWhenSameObject() {
        // Arrange
        Role role = new Role(1L, "ROLE_USER");

        // Act & Assert
        assertEquals(role, role); // same object
    }
}
