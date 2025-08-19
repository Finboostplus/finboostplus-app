package com.finboostplus.service;

import com.finboostplus.DTO.GroupUpdateDTO;
import com.finboostplus.model.Group;
import com.finboostplus.repository.GroupRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.finboostplus.DTO.GroupDto;

@Service
public class GroupService {

    @Autowired
    GroupRepository groupRepository;

    public Group createNewGroup(GroupDto groupDto) {

        Group group;
        group = groupDto.groupDtoToGroup();

        return groupRepository.save(group);
    }

    @Transactional
    public Optional<Group> updateGroup(Long id, GroupUpdateDTO groupDto) {
        return groupRepository.findById(id).map(existingGroup -> {
            if (groupDto.name() != null) {
                existingGroup.setName(groupDto.name());
            }
            if (groupDto.description() != null) {
                existingGroup.setDescription(groupDto.description());
            }
            return groupRepository.save(existingGroup);
        });
    }
}
