package com.finboostplus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.finboostplus.repository.GroupMemberRepository;
import com.finboostplus.repository.GroupRepository;
import com.finboostplus.repository.UserRepository;
import org.springframework.kafka.annotation.EnableKafka;

@EnableKafka
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
        }
}
