package com.finboostplus.notificationemail;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@EnableKafka
@SpringBootApplication
public class NotificationEmailApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationEmailApplication.class, args);
	}

}
