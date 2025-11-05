package com.finboostplus.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finboostplus.DTO.GroupDetailsDTO;
import com.finboostplus.model.Group;
import com.finboostplus.projection.GroupProjection;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
	@Query(nativeQuery = true, value = """
			SELECT
				GROUP_MEMBERS.USER_ID,
				GROUPS.ID,
				GROUPS.NAME,
				GROUPS.DESCRIPTION,
				GROUP_MEMBERS.AUTH_LEVEL AS AUTHORITY,
				GROUPS.ICON,
				GROUPS.CREATED_AT,
				COALESCE(SUM(EXPENSES.VALUE), 0) AS TOTAL_EXPENSES
			FROM
				GROUP_MEMBERS
				INNER JOIN GROUPS ON GROUP_MEMBERS.GROUP_ID = GROUPS.ID
				INNER JOIN EXPENSES ON EXPENSES.GROUP_ID = GROUPS.ID
			WHERE
				GROUP_MEMBERS.USER_ID = :memberId
			GROUP BY
				GROUPS.ID,
				GROUP_MEMBERS.USER_ID,
				AUTH_LEVEL
						""")
	Page<GroupProjection> listUserGroupsPaged(Long memberId, Pageable pageable);

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
				(
					SELECT
						COALESCE(SUM(UED.PARTIAL_VALUE), 0)
					FROM
						EXPENSES E
						INNER JOIN USER_EXPENSE_DIVISIONS UED ON E.ID = UED.EXPENSE_ID
					WHERE
						E.GROUP_ID = :groupId
						AND UED.USER_ID = :userId
				) AS TOTAL
			FROM
				GROUPS AS G
				INNER JOIN GROUP_MEMBERS AS GM ON GM.GROUP_ID = G.ID
			WHERE
				GM.GROUP_ID = :groupId
				AND GM.USER_ID = :userId
			""")
	GroupDetailsDTO getGroupDetails(Long groupId, Long userId);
}
