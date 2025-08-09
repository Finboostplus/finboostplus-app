package com.finboostplus.model;

import java.time.Instant;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.finboostplus.DTO.UserRequestDTO;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;


@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@Entity
@SequenceGenerator(name = "seq_user",sequenceName = "seq_user", allocationSize = 1, initialValue = 1)
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_name", nullable = false)
	private String name;
	@Column(name = "e_mail", nullable = false, unique = true)
	private String email;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "created_at", nullable = false)
	private Instant createdAt;

	@Column(name = "color_theme", nullable = false)
	private String colorTheme;

	@ManyToMany
	@JoinTable(name = "users_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public User(String name, String email, String password, String colorTheme) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.colorTheme = colorTheme;
		this.createdAt = Instant.now();
	}

	public static User dtoToUser(UserRequestDTO dto){
		return new User(dto.name(), dto.email(), dto.password(), dto.colorTheme());
	}

	public void addRole(Role role) {
		roles.add(role);
	}

	public boolean hasRole(String roleName) {
		for (Role role : roles) {
			if (role.getAuthority().equals(roleName)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		User user = (User) o;

		return Objects.equals(id, user.id);
	}

	@Override
	public int hashCode() {
		return id != null ? id.hashCode() : 0;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}