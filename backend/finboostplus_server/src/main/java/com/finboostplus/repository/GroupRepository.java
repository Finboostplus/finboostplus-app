package com.finboostplus.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finboostplus.model.Group;
import com.finboostplus.projection.GroupProjection;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
        @Query(nativeQuery = true, value = """
                        SELECT	groups.id,groups.name,groups.description,group_members.auth_level as authority, groups.icon, groups.created_at,
                                COALESCE(SUM(expenses.value), 0) AS totalExpenses
                                  FROM group_members
                                     INNER JOIN groups ON group_members.group_id = groups.id
                                     INNER JOIN users ON group_members.user_id = users.id
                                     LEFT JOIN expenses ON expenses.group_id = groups.id
                                     WHERE users.id =:memberId
                                     GROUP BY groups.id, auth_level
                        """)
        Page<GroupProjection> listUserGroupsPaged(Long memberId, Pageable pageable);

        @Modifying
        @Query(nativeQuery = true, value = """
                        DELETE FROM groups
                        WHERE id = :groupId
                        """)
        void deleteGroupById(@Param("groupId") Long groupId);
}
