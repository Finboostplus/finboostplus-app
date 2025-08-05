package com.finboostplus.service;

import com.finboostplus.DTO.UserRequestDTO;
import com.finboostplus.exception.EmailAlreadyRegisteredException;
import com.finboostplus.model.Role;
import com.finboostplus.projection.UserDetailsProjection;
import com.finboostplus.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.finboostplus.model.User;
import com.finboostplus.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class UserService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;



	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		List<UserDetailsProjection> result = userRepository.searchUserAndRolesByEmail(username);
		if (result.size() == 0) {
			throw new UsernameNotFoundException("Email não encontrado");
		}

		User user = new User();
		user.setEmail(result.get(0).getUsername());
		user.setPassword(result.get(0).getPassword());
		for (UserDetailsProjection projection : result) {
			user.addRole(new Role(projection.getRoleId(), projection.getAuthority()));
		}

		return user;
	}

	public boolean saveUser(UserRequestDTO dto){
		Optional<User> userEmailExists = userRepository.findByEmailIgnoreCase(dto.email());
		if(userEmailExists.isPresent()){
			throw new EmailAlreadyRegisteredException("E-mail já cadastrado");
		}
		User user = User.dtoToUser(dto);
		PasswordEncoder passwordEncoder = passwordEncoder();
		user.setPassword(passwordEncoder.encode(dto.password()));
		Role role = roleRepository.findByAuthority("ROLE_USER");
		Set<Role> roles = new HashSet<>();
		roles.add(role);
		user.setRoles(roles);
		User userSaved = userRepository.save(user);
		return userSaved.getId() != null;
	}
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
