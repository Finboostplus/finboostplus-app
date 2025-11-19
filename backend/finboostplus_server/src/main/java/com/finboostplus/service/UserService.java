package com.finboostplus.service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.finboostplus.DTO.ChangePasswordDTO;
import com.finboostplus.DTO.SwitchAuthorityRequestDTO;
import com.finboostplus.DTO.UserCreateDTO;
import com.finboostplus.DTO.UserDataDTO;
import com.finboostplus.DTO.UserExpensesDTO;
import com.finboostplus.DTO.UserMonthlyExpensesDTO;
import com.finboostplus.DTO.UserUpdateDTO;
import com.finboostplus.exception.ForbiddenResourceException;
import com.finboostplus.exception.GroupNotFoundException;
import com.finboostplus.exception.InvalidCredentialsException;
import com.finboostplus.exception.MemberHasPendingExpensesException;
import com.finboostplus.exception.UserAlreadyRegisteredOnGroupException;
import com.finboostplus.exception.UserNotFoundException;
import com.finboostplus.exception.ValuesIncompatiblesException;
import com.finboostplus.model.Group;
import com.finboostplus.model.GroupMember;
import com.finboostplus.model.Role;
import com.finboostplus.model.User;
import com.finboostplus.model.ValidateUser;
import com.finboostplus.projection.UserDetailsProjection;
import com.finboostplus.repository.ExpenseRepository;
import com.finboostplus.repository.GroupMemberRepository;
import com.finboostplus.repository.RoleRepository;
import com.finboostplus.repository.UserExpenseDivisionRepository;
import com.finboostplus.repository.UserRepository;
import com.finboostplus.repository.ValidateUserRepository;
import com.finboostplus.util.PasswordGenerator;
import org.springframework.beans.factory.annotation.Value;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	GroupMemberRepository groupMemberRepository;

	@Autowired
	UserExpenseDivisionRepository userExpenseDivisionRepository;

	@Autowired
	@Lazy
	GroupService groupService;

	@Autowired
	@Lazy
	GroupMemberService groupMemberService;

	@Autowired
	private EmailService emailService;

	@Autowired
	ValidateUserRepository validateUserRepository;

	@Autowired
	ExpenseRepository expenseRepository;

	@Value("${URL_BASE}")
	private String urlBase;

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

	public UserDataDTO getUserData() {
		return userRepository.getUserData(authenticated())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
	}

	public Page<UserExpensesDTO> getAllUserExpenses(Pageable pageable) {
		User user = userRepository.findByEmailIgnoreCase(authenticated())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
		return expenseRepository.getAllUserExpenses(user.getId(), pageable);
	}

	public List<UserMonthlyExpensesDTO> getUserMonthlyExpenses() {
		User user = userRepository.findByEmailIgnoreCase(authenticated())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
		return expenseRepository.getUserMonthlyExpenses(user.getId());
	}

	@Transactional
	public boolean saveUser(UserCreateDTO dto) {
		Optional<User> userOptional = userRepository.findByEmailIgnoreCase(dto.email());
		if (userOptional.isPresent()) {
			throw new UserAlreadyRegisteredOnGroupException("Email já cadastrado");
		}
		User user = User.dtoToUser(dto);
		PasswordEncoder passwordEncoder = passwordEncoder();
		user.setPassword(passwordEncoder.encode(dto.password()));
		Role role = roleRepository.findByAuthority("ROLE_USER");
		Set<Role> roles = new HashSet<>();
		roles.add(role);
		user.setRoles(roles);
		User userSaved = userRepository.save(user);
		ValidateUser validateUser = new ValidateUser();
		validateUser.setUser(userSaved);
		validateUser.setUuid(UUID.randomUUID());
		validateUser.setExpirationDate(Instant.now().plusSeconds(900));
		validateUserRepository.save(validateUser);
		emailService.enviarEmailTexto(userSaved.getEmail(),
				"Conta criada com sucesso!",
				"Seja bem vindo(a) " + userSaved.getName() + " ao FinboostPlus!\n" +
						"Para ativar sua conta, acesse o link: " + urlBase + "/user/userValidate/" // Futuramente:
																	// https://finboostplus.com.br
																	// ou
																	// algo
																	// assim
						+ validateUser.getUuid());
		System.out.println("Para ativar sua conta, acesse o link: " + urlBase + "/user/userValidate/");
		System.out.print(validateUser.getUuid()); // Ajuda para ativar o usuário cadastrado
		return userSaved.getId() != null;
	}

	@Transactional
	public boolean updateUser(UserUpdateDTO dto) {
		User user = userRepository.findByEmailIgnoreCase(authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário nao encontrado"));
		if (!dto.name().equals(user.getName())) {
			user.setName(dto.name());
		}
		if (!dto.email().equals(user.getEmail())) {
			user.setEmail(dto.email());
		}
		if (!dto.themeColor().equals(user.getThemeColor()) && dto.themeColor() != null) {
			user.setThemeColor(dto.themeColor());
		}
		User userUpdated = userRepository.save(user);
		return userUpdated.getId() != null;
	}

	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	public void changePassword(ChangePasswordDTO passwordChange) {
		User user = userRepository.findByEmailIgnoreCase(authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
		PasswordEncoder passwordEncoder = passwordEncoder();
		String encodedOldPassword = userRepository.doesPasswordMatch(user.getEmail());
		boolean doesPasswordMatch = passwordEncoder.matches(passwordChange.oldPassword(), encodedOldPassword);
		if (doesPasswordMatch) {
			String encodedNewPassword = passwordEncoder.encode(passwordChange.newPassword());
			user.setPassword(encodedNewPassword);
			userRepository.save(user);
			return;
		}
		throw new InvalidCredentialsException("Credenciais Inválidas");
	}

	public String authenticated() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Jwt jwtPrincipal = (Jwt) authentication.getPrincipal();
			return jwtPrincipal.getClaim("username");
		} catch (Exception e) {
			throw new UsernameNotFoundException("Não foi encontrado o usuário");
		}
	}

	@Transactional
	public void deleteCurrentUserProfile() {
		final User user = userRepository
				.findByEmailIgnoreCase(authenticated())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
		if (groupMemberRepository.isUserOwnerOfAnyGroup(user.getId())) {
			throw new ForbiddenResourceException(
					"Usuário é proprietário de grupos ativos e não pode ser removido");
		}
		if (userExpenseDivisionRepository.doesUserHasAnyExpense(user.getId())) {
			throw new MemberHasPendingExpensesException(
					"Não é possível excluir o perfil com despesas pendentes");
		}
		userExpenseDivisionRepository.deleteExpenseRelationByMemberId(user.getId());
		groupMemberRepository.deleteGroupsRelationByMemberId(user.getId());
		userRepository.deleteById(user.getId());
	}

	@Transactional
	public void forgotPassword(String userName) {
		User user = userRepository.findByEmailIgnoreCase(userName)
				.orElseThrow(() -> new UserNotFoundException("Usuário nao encontrado"));
		String newPassword = PasswordGenerator.generateRandomPassword();
		emailService.enviarEmailTexto(user.getEmail(),
				"Esqueceu sua senha?",
				"Olá " + user.getName() + " sua nova senha é " + newPassword);
		PasswordEncoder passwordEncoder = passwordEncoder();
		user.setPassword(passwordEncoder.encode(newPassword));
	}

	public String validateUser(String uuid) {
		Optional<ValidateUser> validateUser = Optional
				.of(validateUserRepository.findByUuid(UUID.fromString(uuid)).get());
		if (validateUser.isEmpty()) {
			return "Token inválido ou expirado";
		} else if (validateUser.isPresent() && validateUser.get().getExpirationDate().isBefore(Instant.now())) {
			return "Token inválido ou expirado";
		}
		User user = validateUser.get().getUser();
		if (user.isEnabled()) {
			throw new ForbiddenResourceException("Usuário já habilitado");
		}
		user.setActive(true);
		validateUserRepository.delete(validateUser.get());
		return "";
	}

	@Transactional
	public boolean switchAuthority(Long newOwnerId, Long groupId, SwitchAuthorityRequestDTO authDTO) {
		List<String> authLevels = List.of("OWNER", "ADMIN", "USER");
		String setAuthority = authDTO.setAuthority().toUpperCase().trim();
		if (!authLevels.contains(setAuthority))
			throw new ValuesIncompatiblesException("Valor inválido");
		User user = userRepository.findByEmailIgnoreCase(authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário nao encontrado"));
		GroupMember newUserAuth = groupMemberRepository.findGroupMemberByMemberId(newOwnerId, groupId)
				.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
		if (user.getId() == newUserAuth.getUser().getId())
			throw new ForbiddenResourceException("Operação inválida");
		Group group = groupService.getGroup(groupId);
		if (group == null)
			throw new GroupNotFoundException("Grupo não encontrado");
		if (setAuthority == "OWNER") {
			if (!groupMemberRepository.isUserGroupOwner(user.getId(),
					group.getId()))
				throw new ForbiddenResourceException("Acesso negado");
			GroupMember owner = groupMemberRepository.findGroupMemberByMemberId(user.getId(), groupId)
					.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
			owner.setAuthorization("ADMIN");
			newUserAuth.setAuthorization(setAuthority);
			groupMemberRepository.save(owner);
			groupMemberRepository.save(newUserAuth);
			return true;
		}
		if (!groupMemberRepository.doesUserHasAnyAuthority(user.getId(),
				group.getId(), List.of("OWNER", "ADMIN")))
			throw new ForbiddenResourceException("Acesso negado");
		newUserAuth.setAuthorization(setAuthority);
		groupMemberRepository.save(newUserAuth);
		return true;
	}
}
