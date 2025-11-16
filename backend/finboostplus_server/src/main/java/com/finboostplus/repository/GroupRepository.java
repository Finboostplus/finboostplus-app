package com.finboostplus.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finboostplus.DTO.GroupDetailsDTO;
import com.finboostplus.DTO.GroupMemberAuthorityDTO;
import com.finboostplus.model.Group;
import com.finboostplus.projection.GroupProjection;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
	@Query(nativeQuery = true, value = """
			    SELECT
			        G.ID AS GROUP_ID,
			        G.NAME,
			        G.DESCRIPTION,
			        GM.AUTH_LEVEL AS AUTHORITY,
			        G.ICON,
			        G.CREATED_AT,
			        COALESCE(SUM(UED.PARTIAL_VALUE), 0) AS PARTIAL_TOTAL,
			        COALESCE(SUM(E.VALUE), 0) AS TOTAL
			    FROM
			        GROUPS G
			        INNER JOIN GROUP_MEMBERS GM
			            ON GM.GROUP_ID = G.ID
			            AND GM.USER_ID = :memberId
			        LEFT JOIN EXPENSES E
			            ON E.GROUP_ID = G.ID
			            AND E.STATUS != 'PAID'
			        LEFT JOIN USER_EXPENSE_DIVISIONS UED
			            ON UED.EXPENSE_ID = E.ID
			            AND UED.USER_ID = :memberId
			            AND UED.STATUS != 'PAID'
			    GROUP BY
			        G.ID,
			        G.NAME,
			        G.DESCRIPTION,
			        GM.AUTH_LEVEL,
			        G.ICON,
			        G.CREATED_AT
			    ORDER BY
			        G.CREATED_AT DESC
			""")
	Page<GroupProjection> listUserGroupsPaged(@Param("memberId") Long memberId, Pageable pageable);

	@Query(nativeQuery = true, value = """
			SELECT GM.AUTH_LEVEL AS AUTHORITY
			FROM GROUP_MEMBERS AS GM
			WHERE GM.GROUP_ID = :groupId
				AND GM.USER_ID = :memberId
			""")
	GroupMemberAuthorityDTO getMemberAuthority(@Param("groupId") Long groupId, @Param("memberId") Long memberId);

	@Modifying
	@Query(nativeQuery = true, value = """
			DELETE FROM groups
			WHERE id = :groupId
			""")
	void deleteGroupById(@Param("groupId") Long groupId);

	@Query(nativeQuery = true, value = """
			SELECT
			    G.ID,
			    G.NAME,
			    G.DESCRIPTION,
			    G.ICON,
			    GM.AUTH_LEVEL AS AUTHORIZATION,
			    COALESCE((
			        SELECT SUM(UED.PARTIAL_VALUE)
			        FROM USER_EXPENSE_DIVISIONS UED
			        INNER JOIN EXPENSES E ON E.ID = UED.EXPENSE_ID
			        WHERE UED.USER_ID = :userId
			          AND E.GROUP_ID = :groupId
			          AND UED.STATUS != 'PAID'
			    ), 0) AS PARTIAL_TOTAL,
			    COALESCE((
			        SELECT SUM(E.VALUE)
			        FROM EXPENSES E
			        WHERE E.GROUP_ID = :groupId
			          AND E.STATUS != 'PAID'
			    ), 0) AS TOTAL
			FROM GROUPS G
			INNER JOIN GROUP_MEMBERS GM
			    ON GM.GROUP_ID = G.ID
			    AND GM.USER_ID = :userId
			WHERE G.ID = :groupId
			""")
	GroupDetailsDTO getGroupDetails(@Param("groupId") Long groupId, @Param("userId") Long userId);

}
