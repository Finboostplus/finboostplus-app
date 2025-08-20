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
public interface GroupRepository extends JpaRepository<Group,Long> {

//    @Query(nativeQuery = true, value = """
//            SELECT * FROM tb_group where group_creator_id=:creatorId"
//            "countQuery = SELECT count(*) FROM tb_group WHERE group_creator_id = :creatorId
//            """)
//        Page<Group> findByGroupCreatorId(@Param("creatorId") Long creatorId, Pageable pageable);

  @Query(nativeQuery = true, value = "SELECT * FROM tb_group WHERE group_creator_id = :creatorId")
  List<Group> listaGrupoUsuario(Long creatorId, Pageable pageable);


    @Query(nativeQuery = true, value = "SELECT * FROM tb_group WHERE group_creator_id = :creatorId")
    Page<Group> listaGrupoUsuarioPage(Long creatorId, Pageable pageable);


    Group findByName(String name);
}


