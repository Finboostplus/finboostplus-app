package com.finboostplus.model;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "validate_user")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class ValidateUser {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "uuid", nullable = false)
        private UUID uuid;

        @Column(name = "expiration_date", nullable = false)
        private Instant expirationDate;

        @ManyToOne
        @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
        private User user;
}
