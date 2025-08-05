package com.finboostplus.repository;

import com.finboostplus.projection.UserDetailsProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.finboostplus.model.*;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>  {
    @Query(nativeQuery = true, value = """
				SELECT users.e_mail AS username, users.password, roles.id AS roleId, roles.authority
				FROM users
				INNER JOIN users_roles ON users.id = users_roles.user_id
				INNER JOIN roles ON roles.id = users_roles.role_id
				WHERE users.e_mail = :email
			""")
    List<UserDetailsProjection> searchUserAndRolesByEmail(String email);

	Optional<User> findByEmailIgnoreCase(String email);

}
