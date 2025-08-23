package com.finboostplus.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Configuração de segurança ESPECÍFICA para ambiente de teste.
 * <p>
 * Permite acesso ao H2 Console apenas em ambiente de teste.
 * Order(1) garante prioridade sobre outras configurações de segurança.
 * <p>
 * ATENÇÃO: Esta configuração só é ativa no profile 'test'!
 */
@Configuration
@EnableWebSecurity
@Profile("test") // <- IMPORTANTE: Só funciona em ambiente de teste
public class H2SecurityConfig {

    /**
     * Filter chain específico para H2 Console
     * Tem prioridade máxima para evitar conflitos
     */
    @Bean
    @Order(1) // <- Prioridade ALTA - executa ANTES da configuração principal
    public SecurityFilterChain h2ConsoleSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Aplica APENAS às rotas do H2 Console
                .securityMatcher(AntPathRequestMatcher.antMatcher("/h2-console/**"))

                // Permite acesso total ao H2 Console
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**")).permitAll()
                )

                // Desabilita CSRF para H2 Console (necessário para funcionar)
                .csrf(csrf ->
                        csrf.ignoringRequestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**"))
                )

                // Permite frames (interface H2 usa frames)
                .headers(headers -> headers.frameOptions().sameOrigin())

                .build();
    }
}