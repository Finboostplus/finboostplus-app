package com.finboostplus;

import com.finboostplus.model.Group;
import com.finboostplus.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.List;

@SpringBootApplication
@EnableJpaAuditing
public class FinboostplusApplication implements CommandLineRunner {

    @Autowired
    GroupRepository groupRepository;
	public static void main(String[] args) {
		SpringApplication.run(FinboostplusApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {

    }
}
