package com.finboostplus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.finboostplus.repository.GroupMemberRepository;
import com.finboostplus.repository.GroupRepository;
import com.finboostplus.repository.UserRepository;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableKafka
@SpringBootApplication
@EnableScheduling
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
