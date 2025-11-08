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
				G.ID,
				G.NAME,
				G.DESCRIPTION,
				GM.AUTH_LEVEL AS AUTHORITY,
				G.ICON,
				G.CREATED_AT,
				COALESCE(SUM(E.VALUE), 0) AS TOTAL_EXPENSES
			FROM
				GROUPS G
				INNER JOIN GROUP_MEMBERS GM ON GM.GROUP_ID = G.ID
				LEFT JOIN EXPENSES E ON E.GROUP_ID = G.ID
			WHERE
				GM.USER_ID = :memberId
			GROUP BY
				G.ID,
				G.NAME,
				G.DESCRIPTION,
				GM.AUTH_LEVEL,
				G.ICON,
				G.CREATED_AT;
			""")
	Page<GroupProjection> listUserGroupsPaged(Long memberId, Pageable pageable);

	@Query(nativeQuery = true, value = """
			SELECT GM.AUTH_LEVEL AS AUTHORITY
			FROM GROUP_MEMBERS AS GM
			WHERE GM.GROUP_ID = :groupId
				AND GM.USER_ID = :memberId
			""")
	GroupMemberAuthorityDTO getMemberAuthority(Long groupId, Long memberId);

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
						COALESCE(SUM(E.VALUE), 0)
					FROM
						EXPENSES E
					WHERE
						E.GROUP_ID = :groupId
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
