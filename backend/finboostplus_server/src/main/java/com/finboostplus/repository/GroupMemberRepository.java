package com.finboostplus.repository;

import com.finboostplus.model.GroupMember;
import com.finboostplus.DTO.GroupMemberResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    @Query(nativeQuery = true, value = """
       SELECT EXISTS(
            SELECT 1 from group_members as gm
            inner join users as u
            on gm.user_id = u.id
            inner join groups as g
            on g.id = gm.group_id where u.id = :userId and g.id = :groupId
            and gm.auth_level = 'OWNER'
       )
    """)
    boolean isUserAndGroupAndAuthorityValidToUpdateOrDeleteGroup(long userId, long groupId);

    @Query(nativeQuery = true, value = """
        SELECT EXISTS (
            SELECT 1
            FROM group_members gm
            WHERE gm.user_id = :userId
              AND gm.group_id = :groupId
        )
        """)
    boolean isUserMemberOfGroup(long userId, long groupId);


    @Query(nativeQuery = true, value = """
        SELECT u.user_name FROM users u
        inner join group_members gm
        on gm.user_id = u.id
        WHERE gm.group_id = :groupId
        """)
    List<GroupMemberResponseDTO> findMembersByGroupId(long groupId);

    List<GroupMember> findByUser_id(Long userId);

    List<GroupMember> findByGroup_Id(Long groupId);

//    @Query(nativeQuery = true, value = """
//                SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END AS exists_flag
//                FROM group_members AS gm
//                INNER JOIN users AS u ON gm.user_id = u.id
//                INNER JOIN groups AS g ON g.id = gm.group_id
//                WHERE u.id = :userId
//                AND g.id = :groupId
//                AND (gm.auth_level = 'OWNER' OR gm.auth_level = 'ADMIN');
//            """)
//    boolean isUserOnwerAdmin(Long userId,Long groupId,String authLevel);
    @Query(nativeQuery = true, value = """
            SELECT EXISTS (
                SELECT 1
                FROM group_members gm
                WHERE gm.user_id = :userId
                  AND gm.group_id = :groupId
                  AND gm.auth_level IN (:authLevels)
            )
    """)
    boolean isUserOnwerOrAdmin(Long userId, Long groupId, List<String> authLevels);

    @Modifying
    @Transactional
    @Query(
            value = "DELETE FROM group_members WHERE user_id = :userId AND group_id = :groupId",
            nativeQuery = true
    )
    void deleteByUserIdAndGroupId(Long userId, Long groupId);


    @Query(
            nativeQuery = true, value = """
        SELECT * 
        FROM group_members 
        WHERE user_id = :memberId 
          AND group_id = :groupId
        """
    )
    Optional<GroupMember> findGroupMemberByMemberId(@Param("memberId") Long memberId,
                                                    @Param("groupId") Long groupId);


    @Modifying
    @Query(
            value = """
        DELETE FROM group_members 
        WHERE group_id = :groupId
        """,
            nativeQuery = true
    )
    void deleteGroupRelationById(@Param("groupId") Long groupId);

}
