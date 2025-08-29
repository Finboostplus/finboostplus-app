package com.finboostplus.repository;

import com.finboostplus.model.Expense;
import com.finboostplus.model.Group;
import com.finboostplus.projection.GroupProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {



    @Query(nativeQuery = true, value = """
            SELECT	groups.id,	groups.name,groups.description,groups.created_at,
                    COALESCE(SUM(expenses.value), 0) AS total
                      FROM group_members
                         INNER JOIN groups ON group_members.group_id = groups.id
                         INNER JOIN users ON group_members.user_id = users.id
                         LEFT JOIN expenses ON expenses.group_id = groups.id
                         WHERE users.id =:memberId
                         GROUP BY groups.id 
           """)
    Page<Group> listaGrupoUsuarioPage(Long memberId, Pageable pageable);

    @Query(nativeQuery = true, value = """
            SELECT	groups.id,	groups.name,groups.description,groups.created_at,
                    COALESCE(SUM(expenses.value), 0) AS totalExpenses
                      FROM group_members
                         INNER JOIN groups ON group_members.group_id = groups.id
                         INNER JOIN users ON group_members.user_id = users.id
                         LEFT JOIN expenses ON expenses.group_id = groups.id
                         WHERE users.id =:memberId
                         GROUP BY groups.id
            """)
    Page<GroupProjection>listaGroupUsuerProjetction(Long memberId, Pageable pageable);

}
