package com.finboostplus.service;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finboostplus.DTO.GroupMemberDTO;
import com.finboostplus.exception.ForbiddenResourceException;
import com.finboostplus.exception.GroupNotFoundException;
import com.finboostplus.exception.UserAlreadyRegisteredOnGroupException;
import com.finboostplus.exception.UserNotFoundException;
import com.finboostplus.model.Group;
import com.finboostplus.model.GroupMember;
import com.finboostplus.model.GroupMemberId;
import com.finboostplus.model.User;
import com.finboostplus.repository.GroupMemberRepository;
import com.finboostplus.repository.GroupRepository;
import com.finboostplus.repository.UserRepository;

import jakarta.transaction.Transactional;

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

        @Transactional
        public void addGroupMember(Long groupId, GroupMemberDTO groupMemberDTO) {
                User user = userRepository.findByEmailIgnoreCase(userService.authenticated())
                                .orElseThrow(() -> new UserNotFoundException("Usuário logado não encontrado"));
                User groupNewMember = userRepository.findByEmailIgnoreCase(groupMemberDTO.email())
                                .orElseThrow(() -> new UserNotFoundException(
                                                "Usuário que se deseja inserir não foi encontrado"));
		if (!groupNewMember.isEnabled()) {
			throw new UserNotFoundException("Usuário não encontrado");
		}
                Group group = groupRepository.findById(Long.parseLong(String.valueOf(groupId)))
                                .orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
                boolean isUserGroupMember = groupMemberRepository.isUserMemberOfGroup(groupNewMember.getId(), groupId);
                if (isUserGroupMember) {
                        throw new UserAlreadyRegisteredOnGroupException("Usuário já é membro no grupo");
                }
                if (userRepository.isUserAuthorityValidToGroup(user.getId(), groupId,
                                this.AUTHORITIES) == true
                                && (groupMemberDTO.authorization().equals("USER")
                                                || groupMemberDTO.authorization().equals("ADMIN"))) {
                        GroupMember member = new GroupMember();
                        member.setUser(groupNewMember);
                        member.setGroup(group);
                        member.setAuthorization(groupMemberDTO.authorization());
                        member.setId(new GroupMemberId(groupNewMember.getId(), group.getId()));
                        member.setEntryDate(Instant.now());
                        groupMemberRepository.save(member);
                } else {
                        throw new ForbiddenResourceException("Recurso não autorizado");
                }
        }

        @Transactional
        public boolean insertGroupOwner(User user, Group group) {
                GroupMember owner = new GroupMember();
                owner.setUser(user);
                owner.setGroup(group);
                owner.setAuthorization(this.AUTHORITIES.get(0));
                owner.setEntryDate(Instant.now());
                owner.setId(new GroupMemberId(user.getId(), group.getId()));
                return groupMemberRepository.save(owner) != null ? true : false;
        }

        // @Transactional
        // public boolean switchAuthGroup(User user, Group group, int auth) {
        //         GroupMember userAuth = new GroupMember();
        //         userAuth.setUser(user);
        //         userAuth.setGroup(group);
        //         userAuth.setAuthorization(this.AUTHORITIES.get(auth));
        //         userAuth.setEntryDate(Instant.now());
        //         userAuth.setId(new GroupMemberId(user.getId(), group.getId()));
        //         return groupMemberRepository.save(userAuth) != null ? true : false;
        // }

        @Transactional
        public boolean getUsersOnGroupByAuthority(Long userId, Long groupId, List<String> authLevels) {
                return groupMemberRepository.doesUserHasAnyAuthority(userId, groupId, authLevels);
        }

        @Transactional
        public boolean isUserMemberOfGroup(long userId, long groupId) {
                return groupMemberRepository.isUserMemberOfGroup(userId, groupId);
        }
}
