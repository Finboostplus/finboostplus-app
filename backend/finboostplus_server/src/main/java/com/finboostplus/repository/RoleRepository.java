package com.finboostplus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finboostplus.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

        Role findByAuthority(String authority);
}
