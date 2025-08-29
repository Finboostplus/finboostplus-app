package com.finboostplus.service;

import com.finboostplus.DTO.GroupCreateDTO;
import com.finboostplus.DTO.GroupDto;
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

import java.util.Optional;

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
    // public List<Group> listGroupCreator(Long userId, Pageable pageable){
    //
    // return groupRepository.listaGrupoUsuario(userId,pageable);
    // }

    public Page<Group> listCreatorGroupPage(Long userId, Pageable pageable) {

        return groupRepository.listaGrupoUsuarioPage(userId, pageable);
    }

}
