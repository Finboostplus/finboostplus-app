package com.finboostplus.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finboostplus.DTO.GroupCreateDTO;
import com.finboostplus.DTO.GroupMemberDTO;
import com.finboostplus.DTO.GroupMemberResponseDTO;
import com.finboostplus.DTO.GroupUpdateDTO;
import com.finboostplus.DTO.SwitchAuthorityRequestDTO;
import com.finboostplus.model.Group;
import com.finboostplus.projection.GroupProjection;
import com.finboostplus.repository.UserRepository;
import com.finboostplus.service.ExpenseService;
import com.finboostplus.service.GroupMemberService;
import com.finboostplus.service.GroupService;
import com.finboostplus.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/groups")
public class GroupController {
        @Autowired
        GroupService groupService;

        @Autowired
        UserService userService;

        @Autowired
        GroupMemberService groupMemberService;

        @Autowired
        ExpenseService expenseService;

        @Autowired
        UserRepository userRepository;

        @PreAuthorize("hasRole('USER')")
        @GetMapping
        public ResponseEntity<Page<GroupProjection>> listUserGroupsPaged(
                        @RequestParam(name = "page", defaultValue = "0") int page,
                        @RequestParam(name = "size", defaultValue = "6") int size) {
                Pageable pageable = PageRequest.of(page, size);
                Page<GroupProjection> groupsDTO = groupService.listUserGroupsPaged(pageable);
                return new ResponseEntity<>(groupsDTO, HttpStatus.OK);
        }

        @PreAuthorize("hasRole('USER')")
        @GetMapping("/{groupId}/members")
        public ResponseEntity<List<GroupMemberResponseDTO>> findAllMembersByGroupId(@PathVariable long groupId) {
                return new ResponseEntity<>(groupService.findAllMembersByGroupId(groupId), HttpStatus.OK);
        }

        @PreAuthorize("hasRole('USER')")
        @PostMapping
        public ResponseEntity<String> createGroup(@Valid @RequestBody GroupCreateDTO dto) {
                boolean groupIsCreated = groupService.createNewGroup(dto);
                if (groupIsCreated) {
                        return new ResponseEntity<>("Grupo criado com sucesso!", HttpStatus.CREATED);
                }
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        @PreAuthorize("hasRole('USER')")
        @PostMapping("/{groupId}/members")
        public ResponseEntity<String> addGroupMember(@PathVariable Long groupId,
                        @RequestBody GroupMemberDTO groupMemberDTO) {
                groupMemberService.addGroupMember(groupId, groupMemberDTO);
                return new ResponseEntity<>("Membro adicionado com sucesso!", HttpStatus.OK);
        }

        @PreAuthorize("hasRole('USER')")
        @PostMapping("/{groupId}/members/{newAuthId}/transfer-ownership")
        public ResponseEntity<Object> switchAuthority(@PathVariable Long groupId,
                        @PathVariable Long newAuthId,
                        @RequestBody SwitchAuthorityRequestDTO authDTO) {
                if (userService.switchAuthority(newAuthId, groupId, authDTO)) {
                        return ResponseEntity.ok("Autoridade transferida com sucesso");
                }
                return ResponseEntity.badRequest().body("Não foi possivel realizar a transferência");
        }

        @PreAuthorize("hasRole('USER')")
        @PutMapping("/{id}")
        public ResponseEntity<String> updateGroup(@PathVariable Long id, @RequestBody GroupUpdateDTO groupUpdateDTO) {
                Optional<Group> group = groupService.updateGroup(id, groupUpdateDTO);
                if (group.isEmpty()) {
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
                return new ResponseEntity<>("Grupo atualizado com sucesso!", HttpStatus.OK);
        }

        @PreAuthorize("hasRole('USER')")
        @DeleteMapping("/{groupId}/members")
        public ResponseEntity<Void> leaveGroup(@PathVariable Long groupId) {
                groupService.leaveGroup(groupId);
                return ResponseEntity.noContent().build();
        }

        @PreAuthorize("hasRole('USER')")
        @DeleteMapping("/{groupId}/members/{memberId}")
        public ResponseEntity<Void> removeGroupMember(
                        @PathVariable Long groupId,
                        @PathVariable Long memberId) {
                groupService.removeGroupMember(groupId, memberId);
                return ResponseEntity.noContent().build();
        }

        @PreAuthorize("hasRole('USER')")
        @DeleteMapping("/{groupId}")
        public ResponseEntity<Void> deleteGroup(
                        @PathVariable Long groupId) {
                groupService.deleteGroup(groupId);
                return ResponseEntity.noContent().build();
        }
}
