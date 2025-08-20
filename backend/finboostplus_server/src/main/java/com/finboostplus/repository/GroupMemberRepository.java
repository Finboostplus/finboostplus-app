package com.finboostplus.repository;

import com.finboostplus.model.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    /*
        SELECT u.user_name , u.e_mail FROM users u
        INNER JOIN member_group members ON members.user_id = u.id
       INNER JOIN tb_group g ON members.id_group = 2
    * */

    List<GroupMember> findByUser_id(Long userId);

    List<GroupMember> findByGroup_Id(Long groupId);
}
