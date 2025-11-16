package com.finboostplus.notificationemail.config;

import email.ExpenseDueReminderMessage;
import email.ForgotPasswordMessage;
import email.RegistrationEmailMessage;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

import static org.apache.kafka.clients.consumer.ConsumerConfig.*;

@Configuration
public class KafkaConsumerConfig {

    @Value("${spring.kafka.bootstrap-servers:localhost:9092}")
    private String bootstrapServers;

    @Value("${spring.kafka.consumer.group-id:default-group}")
    private String groupId;

    @Bean
    public ConsumerFactory<String, RegistrationEmailMessage> registrationConsumerFactory() {
        JsonDeserializer<RegistrationEmailMessage> deserializer =
                new JsonDeserializer<>(RegistrationEmailMessage.class);
        deserializer.addTrustedPackages("*");
        deserializer.ignoreTypeHeaders();

        Map<String, Object> props = new HashMap<>();
        props.put(BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(GROUP_ID_CONFIG, groupId);
        props.put(KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        props.put(AUTO_OFFSET_RESET_CONFIG, "earliest");

        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), deserializer);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, RegistrationEmailMessage>
    registrationKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, RegistrationEmailMessage> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(registrationConsumerFactory());
        return factory;
    }

    @Bean
    public ConsumerFactory<String, ForgotPasswordMessage> forgotPasswordConsumerFactory() {
        JsonDeserializer<ForgotPasswordMessage> deserializer =
                new JsonDeserializer<>(ForgotPasswordMessage.class);
        deserializer.addTrustedPackages("*");
        deserializer.ignoreTypeHeaders();

        Map<String, Object> props = new HashMap<>();
        props.put(BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(GROUP_ID_CONFIG, groupId);
        props.put(KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        props.put(AUTO_OFFSET_RESET_CONFIG, "earliest");

        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), deserializer);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, ForgotPasswordMessage>
    forgotPasswordKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, ForgotPasswordMessage> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(forgotPasswordConsumerFactory());
        return factory;
    }

    @Bean
    public ConsumerFactory<String, ExpenseDueReminderMessage> expenseDueReminderConsumerFactory() {
        JsonDeserializer<ExpenseDueReminderMessage> deserializer =
                new JsonDeserializer<>(ExpenseDueReminderMessage.class);
        deserializer.addTrustedPackages("*");
        deserializer.ignoreTypeHeaders();

        Map<String, Object> props = new HashMap<>();
        props.put(BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(GROUP_ID_CONFIG, groupId);
        props.put(KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        props.put(AUTO_OFFSET_RESET_CONFIG, "earliest");

        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), deserializer);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, ExpenseDueReminderMessage>
    expenseDueReminderKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, ExpenseDueReminderMessage> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(expenseDueReminderConsumerFactory());
        return factory;
    }
}
