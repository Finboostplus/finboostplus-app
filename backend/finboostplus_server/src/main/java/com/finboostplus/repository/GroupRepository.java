package com.finboostplus.repository;

import com.finboostplus.model.Group;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {



    @Query(nativeQuery = true, value = """
            SELECT tb_g.id ,tb_g.created_at,tb_g.description, tb_g.name, tb_g.group_creator_id
                          FROM member_group m_group
                          INNER JOIN tb_group tb_g ON m_group.id_group = tb_g.id
                          INNER JOIN users ON m_group.user_id = users.id
                          where users.id =:creatorId
            """)
    Page<Group> listaGrupoUsuarioPage(Long creatorId, Pageable pageable);


//    Group listGroupDetails(Long idGroup);
//    Group findByName(String name);
}


