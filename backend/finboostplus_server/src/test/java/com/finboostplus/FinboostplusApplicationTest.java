package com.finboostplus;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class FinboostplusApplicationTest {

    @Test
    void contextLoads() {
        // Este teste verifica se o contexto Spring carrega sem erros
        // Valida todas as configurações, beans e dependências
    }
}
