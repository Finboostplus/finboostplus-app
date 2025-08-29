package com.finboostplus.service;

import com.finboostplus.DTO.*;
import com.finboostplus.exception.GroupNotFoundException;
import com.finboostplus.model.*;
import com.finboostplus.projection.ExpenseProjection;
import com.finboostplus.projection.GroupProjection;
import com.finboostplus.repository.ExpenseRepository;
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

    public boolean createNewGroup(GroupCreateDTO groupDto){
        User user = userRepository
                .findByEmailIgnoreCase(userService.authenticated())
                .orElseThrow(()-> new UsernameNotFoundException("Usuário não encontrado!"));
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
        Integer isValid = groupMemberRepository.isUserAndGroupAndAuthorityValidToUpdateGroup(
                userId, id);
        if (isValid >= 1) {
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

    public GroupDetailsDTO getExpenseGroupById(Long groupId){

        String userName = userService.authenticated();
        User user = userService.getUser(userName);
        Group  group = getGroup(groupId);
        if( group != null){

            List<ExpenseProjection> expenseList = expenseRepository.listExpensesGroupById(user.getId(),groupId);
             GroupDetailsDTO dto= new GroupDetailsDTO(group.getId(), group.getName(), expenseList);
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
                    .map(exp -> new ExpenseDTO(exp.getId(),exp.getTitle(),exp.getDescription(),exp.getValue()))
                    .collect(Collectors.toSet());

            return new GroupDto(
                    group.getId(),
                    group.getName(),
                    group.getDescription(),
                     expenseDtos
            );
        });

    }

    public Page<GroupProjection>listaCreatorGroupPageProjection(Long userId, Pageable pageable){
        Page<GroupProjection> groups = groupRepository.listaGroupUsuerProjetction(userId,pageable);

        return groups;
    }
    public Group getGroup(Long idGroup) {
        Group group = groupRepository.findById(idGroup).
                orElseThrow(()-> new GroupNotFoundException("Grupo não encontrado"));

        return group;
    }

}
