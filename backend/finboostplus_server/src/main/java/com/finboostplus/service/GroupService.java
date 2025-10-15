package com.finboostplus.service;

import com.finboostplus.DTO.*;
import com.finboostplus.exception.GroupNotFoundException;
import com.finboostplus.exception.OwnerLeaveNotAllowedException;
import com.finboostplus.exception.MemberHasPendingExpensesException;
import com.finboostplus.model.*;
import com.finboostplus.projection.ExpenseProjection;
import com.finboostplus.projection.GroupProjection;
import com.finboostplus.repository.ExpenseRepository;

import com.finboostplus.DTO.GroupCreateDTO;
import com.finboostplus.DTO.GroupDto;
import com.finboostplus.DTO.GroupMemberResponseDTO;
import com.finboostplus.DTO.GroupUpdateDTO;
import com.finboostplus.model.Group;
import com.finboostplus.model.GroupMember;
import com.finboostplus.model.GroupMemberId;
import com.finboostplus.model.User;

import com.finboostplus.repository.GroupMemberRepository;
import com.finboostplus.repository.GroupRepository;
import com.finboostplus.repository.UserRepository;
import com.finboostplus.exception.ForbiddenResourceException;
import com.finboostplus.exception.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import java.util.Set;
import java.util.stream.Collectors;

import java.util.List;

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

        public boolean createNewGroup(GroupCreateDTO groupDto) {
                User user = userRepository
                                .findByEmailIgnoreCase(userService.authenticated())
                                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
                Group group = groupDto.groupDtoToGroup(user.getId());
                group = groupRepository.save(group);
                return groupMemberService.addOwnerGroup(user, group);
        }

        @Transactional
        public Optional<Group> updateGroup(Long id, GroupUpdateDTO groupDto) {
                String username = userService.authenticated();
                Optional<User> user = userRepository.findByEmailIgnoreCase(username);
                if (user.isEmpty()) {
                        throw new UserNotFoundException("Usuário não encontrado");
                }
                Long userId = user.get().getId();
                boolean isValid = groupMemberRepository.isUserAndGroupAndAuthorityValidToUpdateOrDeleteGroup(
                                userId, id);
                if (isValid == true) {
                        Optional<Group> optional = groupRepository.findById(id);
                        Group group = optional.get();
                        if (groupDto.name() != null && !groupDto.name().equals("")) {
                                group.setName(groupDto.name());
                        }
                        if (groupDto.description() != null) {
                                group.setDescription(groupDto.description());
                        }
                        return Optional.ofNullable(groupRepository.save(group));
                } else {
                        throw new ForbiddenResourceException("Usuário sem permissão");
                }
        }

        public boolean addMemberGroup(Long id, String email) {

                return false;
        }

        // public List<Group> listGroupCreator(Long userId, Pageable pageable){
        //
        // return groupRepository.listaGrupoUsuario(userId,pageable);
        // }

        public GroupDetailsDTO getExpenseGroupById(Long groupId) {
                User user = userRepository
                                .findByEmailIgnoreCase(userService.authenticated())
                                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));

                Group group = getGroup(groupId);
                if (group != null) {
                        List<ExpenseProjection> expenseList = expenseRepository.listExpensesGroupById(user.getId(),
                                        groupId);
                        GroupDetailsDTO dto = new GroupDetailsDTO(group.getId(), group.getName(), expenseList);
                        System.out.println(dto.toString());
                        return dto;

                }
                return null;
        }

        @Transactional(readOnly = true)
        public Page<GroupDto> listCreatorGroupPageDTO(Long userId, Pageable pageable) {
                Page<Group> groups = groupRepository.listaGrupoUsuarioPage(userId, pageable);

                return groups.map(group -> {
                        Set<ExpenseDTO> expenseDtos = group.getExpenses().stream()
                                        .map(exp -> new ExpenseDTO(exp.getId(), exp.getTitle(), exp.getDescription(),
                                                        exp.getValue()))
                                        .collect(Collectors.toSet());

                        return new GroupDto(
                                        group.getId(),
                                        group.getName(),
                                        group.getDescription(),
                                        expenseDtos);
                });

        }

        public Page<GroupProjection> listaCreatorGroupPageProjection(Long userId, Pageable pageable) {
                Page<GroupProjection> groups = groupRepository.listaGroupUsuerProjetction(userId, pageable);

                return groups;
        }

        public Group getGroup(Long idGroup) {
                Group group = groupRepository.findById(idGroup)
                                .orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));

                return group;
        }

        public List<GroupMemberResponseDTO> findAllMembersByGroupId(Long groupId) {
                String username = userService.authenticated();
                Long userId = userRepository.findByEmailIgnoreCase(username)
                                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!")).getId();
                groupRepository.findById(groupId)
                                .orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
                boolean isMember = groupMemberRepository.isUserMemberOfGroup(userId, groupId) == true;
                if (isMember) {
                        return groupMemberRepository.findMembersByGroupId(groupId);
                } else {
                        throw new ForbiddenResourceException("Usuário sem permissão");
                }
        }

        public void leaveGroup(Long groupId) {
                User user = userRepository.findByEmailIgnoreCase(userService.authenticated())
                                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

                groupRepository.findById(groupId)
                                .orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));

                if (groupMemberRepository.isUserOnwerOrAdmin(user.getId(), groupId, List.of("OWNER"))) {
                        throw new OwnerLeaveNotAllowedException(
                                        "O dono do grupo não pode sair antes de transferir a função para outro membro");
                }

                if (expenseRepository.memberHasPendingExpenses(user.getId(), groupId)) {
                        throw new MemberHasPendingExpensesException(
                                        "Membro não pode deixar o grupo com despesas em aberto");
                }

                groupMemberRepository.deleteByUserIdAndGroupId(user.getId(), groupId);
        }

        public void removeGroupMember(Long groupId, Long memberId) {
                String userName = userService.authenticated();

                User loggedUser = userRepository.findByEmailIgnoreCase(userName)
                                .orElseThrow(() -> new UserNotFoundException("Usuário autenticado não encontrado"));

                GroupMember loggedInMember = groupMemberRepository
                                .findGroupMemberByMemberId(loggedUser.getId(), groupId)
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "Usuário autenticado não encontrado no grupo"));

                GroupMember targetMember = groupMemberRepository.findGroupMemberByMemberId(memberId, groupId)
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "Usuário que se pretende remover não foi encontrado"));

                if (!groupMemberRepository.isUserMemberOfGroup(loggedUser.getId(), groupId) ||
                                !groupMemberRepository.isUserMemberOfGroup(targetMember.getUser().getId(), groupId)) {
                        throw new ForbiddenResourceException("Acesso não permitido");
                }

                if (expenseRepository.memberHasPendingExpenses(targetMember.getUser().getId(), groupId)) {
                        throw new MemberHasPendingExpensesException("Usuário ainda possui despesas pendentes");
                }

                String targetAuth = targetMember.getAuthorization();
                String loggedAuth = loggedInMember.getAuthorization();

                if ("OWNER".equals(loggedAuth)) {
                        groupMemberRepository.deleteByUserIdAndGroupId(memberId, groupId);
                } else if ("ADMIN".equals(loggedAuth) && "USER".equals(targetAuth)) {
                        groupMemberRepository.deleteByUserIdAndGroupId(memberId, groupId);
                } else {
                        throw new ForbiddenResourceException("Recurso não permitido");
                }
        }

        @Transactional
        public void deleteGroup(Long groupId) {
                String userName = userService.authenticated();

                User loggedUser = userRepository.findByEmailIgnoreCase(userName)
                                .orElseThrow(() -> new UserNotFoundException("Usuário autenticado não encontrado"));

                groupRepository.findById(groupId)
                                .orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));

                if (groupMemberRepository.isUserAndGroupAndAuthorityValidToUpdateOrDeleteGroup(loggedUser.getId(),
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
