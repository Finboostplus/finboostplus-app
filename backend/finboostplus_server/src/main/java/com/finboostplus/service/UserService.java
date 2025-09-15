package com.finboostplus.service;

import com.finboostplus.DTO.UserCreateDTO;
import com.finboostplus.DTO.UserUpdateDTO;
import com.finboostplus.exception.EmailAlreadyRegisteredException;
import com.finboostplus.exception.ForbiddenResourceException;
import com.finboostplus.exception.MemberHasPendingExpensesException;
import com.finboostplus.exception.UserNotFoundException;
import com.finboostplus.model.Role;
import com.finboostplus.projection.UserDetailsProjection;
import com.finboostplus.repository.RoleRepository;
import com.finboostplus.repository.GroupMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.finboostplus.model.User;
import com.finboostplus.repository.UserRepository;
import com.finboostplus.repository.UserExpenseDivisionRepository;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    GroupMemberRepository groupMemberRepository;

    @Autowired
    UserExpenseDivisionRepository userExpenseDivisionRepository;


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

    public boolean saveUser(UserCreateDTO dto) {
        Optional<User> userEmailExists = userRepository.findByEmailIgnoreCase(dto.email());
        if (userEmailExists.isPresent()) {
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

    public boolean updateUser(String email, UserUpdateDTO dto) {
        Optional<User> userOptional = userRepository.findByEmailIgnoreCase(email);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("Usuário nao encontrado");
        }
        User user = userOptional.get();
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

    public String authenticated() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Jwt jwtPrincipal = (Jwt) authentication.getPrincipal();
            return jwtPrincipal.getClaim("username");
        } catch (Exception e) {
            throw new UsernameNotFoundException("Não foi encontrado o usuário");
        }

    }

    public User getUser(String username) {
        Optional<User> userOp = userRepository.findByEmailIgnoreCase(username);
        var user = userOp.get();
        return user;
    }

    @Transactional
    public void deleteCurrentUserProfile() {
        final String userName = authenticated();

        final User user = userRepository.findByEmailIgnoreCase(userName)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        if (groupMemberRepository.isUserOwnerOfAnyGroup(user.getId())) {
            throw new ForbiddenResourceException("Usuário é proprietário de grupos ativos e não pode ser removido");
        }

        if (userExpenseDivisionRepository.hasUserAnyExpense(user.getId())) {
            throw new MemberHasPendingExpensesException("Não é possível excluir o perfil com despesas pendentes");
        }

        // Remover relações antes de excluir o usuário
        userExpenseDivisionRepository.deleteExpenseRelationByMemberId(user.getId());
        groupMemberRepository.deleteGroupsRelationByMemberId(user.getId());

        // Excluir usuário
        userRepository.deleteById(user.getId());
    }

}
