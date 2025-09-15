package com.finboostplus;

import com.finboostplus.repository.GroupRepository;
import com.finboostplus.repository.GroupMemberRepository;
import com.finboostplus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class FinboostplusApplication implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    GroupMemberRepository groupMemberRepository;
	public static void main(String[] args) {
		SpringApplication.run(FinboostplusApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
//
//        Optional<User> userOptional = userRepository.findByEmailIgnoreCase("crdornellesffy@gmaiL.bol");
//        Group group = new Group();
//        group.setName("Passeio");
//        group.setDescription("Passeio no parque de diversões");
//
//         var groupSave = groupRepository.save(group);
//         var user = userOptional.get();
//
//        MemberGroup members = new MemberGroup();
//        members.setUser(user);
//        members.setGroup(groupSave);
//        members.setId(new MemberGroupId(user.getId(),groupSave.getId()));
//
//        memberGroupRepository.save(members);


        /**
         * Exemplo de retorno  de uma lista  usuários de um grupo especifico
         */

      /*  SELECT u.user_name, u.e_mail FROM users u
        INNER JOIN member_group mb ON mb.user_id= u.id
        INNER JOIN tb_group tb_g ON mb.id_group=3*/


    }
}
