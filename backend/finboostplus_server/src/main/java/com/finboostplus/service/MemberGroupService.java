package com.finboostplus.service;

import com.finboostplus.DTO.GroupDto;
import com.finboostplus.DTO.UserRequestDTO;
import com.finboostplus.model.Group;
import com.finboostplus.model.GroupMember;
import com.finboostplus.model.GroupMemberId;
import com.finboostplus.model.User;
import com.finboostplus.repository.GroupRepository;
import com.finboostplus.repository.GroupMemberRepository;
import com.finboostplus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberGroupService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    GroupMemberRepository groupMemberRepository;

    public void addUserGroup(UserRequestDTO userRequestDTO, GroupDto groupDto, String authorization) {
        Optional<User> userOptional = userRepository.findByEmailIgnoreCase(userRequestDTO.email());
        var user = userOptional.get();

        Optional<Group> groupOptional = groupRepository.findById(Long.parseLong(String.valueOf(groupDto.id())));
        var group = groupOptional.get();

        if (user != null && group != null) {
            GroupMember members = new GroupMember();
            members.setUser(user);
            members.setGroup(group);
            members.setAuthorization(authorization);
            members.setId(new GroupMemberId(user.getId(), group.getId()));
            groupMemberRepository.save(members);
        }

    }
}
