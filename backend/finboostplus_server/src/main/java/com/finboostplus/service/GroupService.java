package com.finboostplus.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.finboostplus.DTO.GroupCreateDTO;
import com.finboostplus.DTO.GroupDetailsDTO;
import com.finboostplus.DTO.GroupMemberAuthorityDTO;
import com.finboostplus.DTO.GroupMemberResponseDTO;
import com.finboostplus.DTO.GroupUpdateDTO;
import com.finboostplus.exception.ForbiddenResourceException;
import com.finboostplus.exception.GroupNotFoundException;
import com.finboostplus.exception.MemberHasPendingExpensesException;
import com.finboostplus.exception.OwnerLeaveNotAllowedException;
import com.finboostplus.exception.UserNotFoundException;
import com.finboostplus.model.Group;
import com.finboostplus.model.GroupMember;
import com.finboostplus.model.User;
import com.finboostplus.projection.GroupProjection;
import com.finboostplus.repository.ExpenseRepository;
import com.finboostplus.repository.GroupMemberRepository;
import com.finboostplus.repository.GroupRepository;
import com.finboostplus.repository.UserRepository;

@Service
public class GroupService {
	@Autowired
	GroupRepository groupRepository;

	@Autowired
	GroupMemberRepository groupMemberRepository;

	@Autowired
	GroupMemberService groupMemberService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;

	@Autowired
	ExpenseRepository expenseRepository;

	@Transactional
	public boolean createNewGroup(GroupCreateDTO groupDto) {
		User user = userRepository
				.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
		Group group = groupDto.groupDtoToGroup();
		group = groupRepository.save(group);
		return groupMemberService.insertGroupOwner(user, group);
	}

	@Transactional
	public Optional<Group> updateGroup(Long id, GroupUpdateDTO groupDto) {
		User user = userRepository
				.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
		boolean isValid = groupMemberRepository.isUserGroupOwner(
				user.getId(), id);
		if (isValid) {
			Group group = groupRepository.findById(id)
					.orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
			if (groupDto.name() != null && !groupDto.name().equals("")) {
				group.setName(groupDto.name());
			}
			if (groupDto.description() != null) {
				group.setDescription(groupDto.description());
			}
			if (groupDto.icon() != null) {
				group.setIcon(groupDto.icon());
			}
			return Optional.ofNullable(groupRepository.save(group));
		}
		throw new ForbiddenResourceException("Usuário sem permissão");
	}

	// @Transactional(readOnly = true)
	// public GroupDetailsDTO getGroupExpensesById(Long groupId) {
	// User user = userRepository
	// .findByEmailIgnoreCase(userService.authenticated())
	// .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
	// Group group = getGroup(groupId);
	// if (group != null) {
	// List<ExpenseProjection> expenseList =
	// expenseRepository.listExpensesGroupById(user.getId(),
	// groupId);
	// GroupDetailsDTO dto = new GroupDetailsDTO(group.getId(), group.getName(),
	// expenseList);
	// return dto;
	// }
	// return null;
	// }

	@Transactional(readOnly = true)
	public Page<GroupProjection> listUserGroupsPaged(Pageable pageable) {
		User user = userRepository
				.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
		Page<GroupProjection> groups = groupRepository.listUserGroupsPaged(user.getId(), pageable);
		return groups;
	}

	@Transactional(readOnly = true)
	public Group getGroup(Long idGroup) {
		Group group = groupRepository.findById(idGroup)
				.orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
		return group;
	}

	@Transactional(readOnly = true)
	public GroupMemberAuthorityDTO getMemberAuthority(Long groupId, Long memberId) {
		User user = userRepository
				.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
		boolean isLoggedUserMemberOfGroup = groupMemberRepository.isUserMemberOfGroup(user.getId(), groupId);
		boolean isUserMemberOfGroup = groupMemberRepository.isUserMemberOfGroup(memberId, groupId);
		if (isLoggedUserMemberOfGroup && isUserMemberOfGroup) {
			return groupRepository.getMemberAuthority(groupId, memberId);
		}
		throw new ForbiddenResourceException("Acesso negado");
	}

	@Transactional(readOnly = true)
	public GroupDetailsDTO getGroupDetails(Long groupId) {
		User user = userRepository.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
		groupRepository.findById(groupId)
				.orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
		boolean isUserMemberOfGroup = groupMemberRepository.isUserMemberOfGroup(user.getId(), groupId);
		if (isUserMemberOfGroup) {
			return groupRepository.getGroupDetails(groupId, user.getId());
		}
		throw new ForbiddenResourceException("Acesso negado");
	}

	@Transactional(readOnly = true)
	public Page<GroupMemberResponseDTO> findAllMembersByGroupId(Long groupId, Pageable pageable, String search) {
		Long userId = userRepository.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!")).getId();
		groupRepository.findById(groupId)
				.orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
		boolean isMember = groupMemberRepository.isUserMemberOfGroup(userId, groupId);
		if (!isMember) {
			throw new ForbiddenResourceException("Usuário sem permissão");
		}
		if (search.isBlank() || search.isEmpty()) {
			return groupMemberRepository.findMembersByGroupId(groupId, pageable);
		}
		return groupMemberRepository.findMembersByGroupIdFiltered(groupId, pageable, search);
	}

	@Transactional
	public void leaveGroup(Long groupId) {
		User user = userRepository.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
		groupRepository.findById(groupId)
				.orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
		if (groupMemberRepository.doesUserHasAnyAuthority(user.getId(), groupId, List.of("OWNER"))) {
			throw new OwnerLeaveNotAllowedException(
					"O dono do grupo não pode sair antes de transferir a função para outro membro");
		}
		if (expenseRepository.doesMemberHasPendingExpenses(user.getId(), groupId)) {
			throw new MemberHasPendingExpensesException(
					"Membro não pode deixar o grupo com despesas em aberto");
		}
		groupMemberRepository.deleteByUserIdAndGroupId(user.getId(), groupId);
	}

	@Transactional
	public void removeGroupMember(Long groupId, Long memberId) {
		User user = userRepository.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário autenticado não encontrado"));
		GroupMember loggedInMember = groupMemberRepository
				.findGroupMemberByMemberId(user.getId(), groupId)
				.orElseThrow(() -> new UsernameNotFoundException(
						"Usuário autenticado não encontrado no grupo"));
		GroupMember targetMember = groupMemberRepository.findGroupMemberByMemberId(memberId, groupId)
				.orElseThrow(() -> new UsernameNotFoundException(
						"Usuário que se pretende remover não foi encontrado"));
		if (!groupMemberRepository.isUserMemberOfGroup(user.getId(), groupId) ||
				!groupMemberRepository.isUserMemberOfGroup(targetMember.getUser().getId(), groupId)) {
			throw new ForbiddenResourceException("Acesso não permitido");
		}
		if (expenseRepository.doesMemberHasPendingExpenses(targetMember.getUser().getId(), groupId)) {
			throw new MemberHasPendingExpensesException("Usuário ainda possui despesas pendentes");
		}
		String targetAuth = targetMember.getAuthorization();
		String loggedAuth = loggedInMember.getAuthorization();
		if ("OWNER".equals(loggedAuth)) {
			groupMemberRepository.deleteByUserIdAndGroupId(memberId, groupId);
		} else if ("ADMIN".equals(loggedAuth) && "USER".equals(targetAuth)) {
			groupMemberRepository.deleteByUserIdAndGroupId(memberId, groupId);
		}
		throw new ForbiddenResourceException("Recurso não permitido");
	}

	@Transactional
	public void deleteGroup(Long groupId) {
		String userName = userService.authenticated();
		User loggedUser = userRepository.findByEmailIgnoreCase(userName)
				.orElseThrow(() -> new UserNotFoundException("Usuário autenticado não encontrado"));
		groupRepository.findById(groupId)
				.orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
		if (groupMemberRepository.isUserGroupOwner(loggedUser.getId(),
				groupId) == false) {
			throw new ForbiddenResourceException("Usuário não possui autoridade para excluir o grupo");
		}
		if (expenseRepository.groupHasPendingExpenses(groupId)) {
			throw new ForbiddenResourceException("Grupo possui despesas pendentes e não pode ser excluído");
		}
		groupMemberRepository.deleteGroupRelationById(groupId);
		groupRepository.deleteGroupById(groupId);
	}
}
