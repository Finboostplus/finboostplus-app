package com.finboostplus.service;


import com.finboostplus.model.Group;
import com.finboostplus.model.GroupMember;
import com.finboostplus.model.GroupMemberId;
import com.finboostplus.model.User;
import com.finboostplus.repository.GroupRepository;
import com.finboostplus.repository.GroupMemberRepository;
import com.finboostplus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.finboostplus.DTO.GroupMemberDTO;
import com.finboostplus.exception.ForbiddenResourceException;
import com.finboostplus.exception.GroupNotFoundException;
import com.finboostplus.exception.UserAlreadyRegisteredOnGroupException;
import com.finboostplus.exception.UserNotFoundException;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class GroupMemberService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    GroupMemberRepository groupMemberRepository;

    @Autowired
    UserService userService;

    private final List<String> AUTHORITIES = Arrays.asList("OWNER", "ADMIN");

    public void addGroupMember(Long groupId, GroupMemberDTO groupMemberDTO){
        Optional<User> userLoggedInOptional = userRepository.findByEmailIgnoreCase(userService.authenticated());
        var userLoggedIn = userLoggedInOptional.orElseThrow(() ->new UserNotFoundException("Usuário logado não encontrado"));

        Optional<User> userNewMemberOptional = userRepository.findByEmailIgnoreCase(groupMemberDTO.email());
        var userNewMember = userNewMemberOptional.orElseThrow(() ->new UserNotFoundException("Usuário que se deseja inserir não foi encontrado"));

        Optional<Group> groupOptional = groupRepository.findById(Long.parseLong(String.valueOf(groupId)));
        var group = groupOptional.orElseThrow(() ->new GroupNotFoundException("Grupo não encontrado"));

        Integer isUserGroupMember = groupMemberRepository.isUserMemberOfGroup(userNewMember.getId(), groupId);
        if(isUserGroupMember>0){
            throw new UserAlreadyRegisteredOnGroupException("Usuário já é membro no grupo");
        }

        if(userRepository.isUserAuthorityValidToGroup(userLoggedIn.getId(),groupId, this.AUTHORITIES)>0
                && (groupMemberDTO.authorization().equals("USER") || groupMemberDTO.authorization().equals("ADMIN"))){
            GroupMember member = new GroupMember();
            member.setUser(userNewMember);
            member.setGroup(group);
            member.setAuthorization(groupMemberDTO.authorization());
            member.setId(new GroupMemberId(userNewMember.getId(),group.getId()));
            member.setEntryDate(Instant.now());
            groupMemberRepository.save(member);
        }else{
            throw new ForbiddenResourceException("Recurso não autorizado");
        }
    }

    public boolean addOwnerGroup(User user, Group group){
        GroupMember owner = new GroupMember();
        owner.setUser(user);
        owner.setGroup(group);
        owner.setAuthorization(this.AUTHORITIES.get(0));
        owner.setEntryDate(Instant.now());
        owner.setId(new GroupMemberId(user.getId(),group.getId()));
        return groupMemberRepository.save(owner) != null? true : false;
    }

    boolean getUserOnwerAdmin(Long userId,Long groupId, List<String> authLevels){

        return groupMemberRepository.isUserOnwerAdmin(userId,groupId,authLevels);
    }
}
