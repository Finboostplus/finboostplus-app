CREATE SEQUENCE seq_category
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE categories (
    id BIGINT NOT NULL DEFAULT nextval('seq_category'),
    name VARCHAR(255) UNIQUE,
    CONSTRAINT pk_categories PRIMARY KEY (id)
);


CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    authority VARCHAR(255) NOT NULL UNIQUE
);
