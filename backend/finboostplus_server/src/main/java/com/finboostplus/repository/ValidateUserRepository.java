package com.finboostplus.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finboostplus.model.ValidateUser;

public interface ValidateUserRepository extends JpaRepository<ValidateUser, Long> {
        public Optional<ValidateUser> findByUuid(UUID uuid);
}
