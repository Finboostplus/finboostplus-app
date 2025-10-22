package com.finboostplus.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finboostplus.DTO.GroupMemberResponseDTO;
import com.finboostplus.model.GroupMember;

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
        boolean isUserGroupOwner(long userId, long groupId);

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
                        SELECT u.id, u.user_name, u.theme_color, gm.auth_level as authority FROM users u
                        inner join group_members gm
                        on gm.user_id = u.id
                        WHERE gm.group_id = :groupId
                        """)
        List<GroupMemberResponseDTO> findMembersByGroupId(long groupId);

        @Query(nativeQuery = true, value = """
                        SELECT *
                        FROM group_members
                        WHERE user_id = :memberId
                          AND group_id = :groupId
                        """)
        Optional<GroupMember> findGroupMemberByMemberId(@Param("memberId") Long memberId,
                        @Param("groupId") Long groupId);

        @Query(nativeQuery = true, value = """
                           SELECT EXISTS(
                                SELECT 1 from group_members
                                where auth_level = 'OWNER' and user_id =:memberId
                           )
                        """)
        boolean isUserOwnerOfAnyGroup(long memberId);

        @Query(nativeQuery = true, value = """
                                SELECT EXISTS (
                                    SELECT 1
                                    FROM group_members gm
                                    WHERE gm.user_id = :userId
                                      AND gm.group_id = :groupId
                                      AND gm.auth_level IN (:authLevels)
                                )
                        """)
        boolean doesUserHasAnyAuthority(Long userId, Long groupId, List<String> authLevels);

        List<GroupMember> findByUser_id(Long userId);

        List<GroupMember> findByGroup_Id(Long groupId);

        @Modifying
        @Query(value = "DELETE FROM group_members WHERE user_id = :userId AND group_id = :groupId", nativeQuery = true)
        void deleteByUserIdAndGroupId(Long userId, Long groupId);

        @Modifying
        @Query(value = """
                        DELETE FROM group_members
                        WHERE group_id = :groupId
                        """, nativeQuery = true)
        void deleteGroupRelationById(@Param("groupId") Long groupId);

        @Modifying
        @Query(value = """
                        DELETE FROM group_members
                        WHERE user_id = :memberId
                        """, nativeQuery = true)
        void deleteGroupsRelationByMemberId(@Param("memberId") Long memberId);
}
