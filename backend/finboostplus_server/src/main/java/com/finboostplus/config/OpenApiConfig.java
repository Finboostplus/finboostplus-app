package com.finboostplus.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("FinBoostPlus API")
                        .description("""
                                # API para Gerenciamento Financeiro Pessoal
                                
                                A **FinBoost Plus API** oferece funcionalidades completas para controle financeiro pessoal, 
                                incluindo gerenciamento de gastos, grupos colaborativos e análises financeiras avançadas.
                                
                                ## Funcionalidades Principais
                                
                                - **Gestão de Usuários**: Cadastro, autenticação e perfis personalizados
                                - **Controle de Gastos**: Registro e categorização de despesas
                                - **Grupos Colaborativos**: Compartilhamento de gastos em grupo
                                - **Análises Financeiras**: Relatórios e insights sobre seus gastos
                                - **Personalização**: Temas de cores e preferências do usuário
                                
                                ## Autenticação
                                
                                Esta API utiliza **JWT (JSON Web Tokens)** para autenticação segura. 
                                Para usar endpoints protegidos:
                                
                                1. Faça login para obter seu token JWT
                                2. Clique no botão "Authorize" acima
                                3. Insira: `Bearer seu_token_aqui`
                                4. Teste os endpoints protegidos!
                                
                                ## Como Usar
                                
                                1. **Cadastre-se** usando o endpoint `POST /user`
                                2. **Autentique-se** para obter seu token JWT
                                3. **Explore** os endpoints disponíveis
                                4. **Teste** diretamente nesta interface!
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("FinBoostPlus Team")
                                .email("finboostplus@gmail.com")
                                .url("https://finboostplus.github.io/finboostplus-app/"))
                        .license(new License()
                                .name("MPL-2.0")
                                .url("https://www.mozilla.org/en-US/MPL/2.0/")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Servidor de Desenvolvimento")
                ))
                .externalDocs(new ExternalDocumentation()
                        .description("Documentação Completa do Projeto")
                        .url("https://finboostplus.github.io/finboostplus-app/"))
                // Unificação de components: esquema + respostas globais
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Token JWT para autenticação. Formato: Bearer {token}"))
                        .addResponses("BadRequest", new ApiResponse().description("400 - Requisição inválida"))
                        .addResponses("Unauthorized", new ApiResponse().description("401 - Não autenticado / token ausente ou inválido"))
                        .addResponses("Forbidden", new ApiResponse().description("403 - Acesso negado"))
                        .addResponses("NotFound", new ApiResponse().description("404 - Recurso não encontrado"))
                        .addResponses("InternalError", new ApiResponse().description("500 - Erro interno do servidor")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .tags(List.of(
                        new Tag().name("Usuários").description("Gestão e perfil de usuários"),
                        new Tag().name("Autenticação").description("Fluxos de login, refresh e segurança"),
                        new Tag().name("Gastos").description("Operações de despesas e categorias"),
                        new Tag().name("Grupos").description("Compartilhamento e colaboração"),
                        new Tag().name("Relatórios").description("Insights e análises financeiras")
                ));
    }
}