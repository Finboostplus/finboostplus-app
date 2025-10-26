INSERT INTO roles (authority)
VALUES ('ROLE_USER');

INSERT INTO categories (id, name) VALUES
  (1, 'Alimentação'),
  (2, 'Transporte'),
  (3, 'Moradia'),
  (4, 'Contas e Utilidades'),
  (5, 'Saúde'),
  (6, 'Educação'),
  (7, 'Lazer e Entretenimento'),
  (8, 'Compras e Serviços'),
  (9, 'Viagens'),
  (10, 'Assinaturas e Streaming'),
  (11, 'Presentes e Doações'),
  (12, 'Investimentos'),
  (13, 'Impostos e Taxas'),
  (14, 'Animais de Estimação'),
  (15, 'Outros');

ALTER SEQUENCE seq_category RESTART WITH 16;
