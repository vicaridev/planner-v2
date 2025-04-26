-- Criação da nova tabela com a coluna `name` obrigatória
CREATE TABLE "new_users" (
    "id" SERIAL PRIMARY KEY,  -- Usando SERIAL para auto incremento, adequado para PostgreSQL
    "name" TEXT NOT NULL,     -- Coluna `name` agora obrigatória
    "email" TEXT NOT NULL UNIQUE,  -- Coluna `email` obrigatória e com índice único
    "password" TEXT NOT NULL  -- Coluna `password` obrigatória
);

-- Inserção dos dados da tabela original para a nova tabela
INSERT INTO "new_users" ("email", "id", "name", "password")
SELECT "email", "id", "name", "password" FROM "users";

-- Exclusão da tabela original
DROP TABLE "users";

-- Renomeação da nova tabela para `users`
ALTER TABLE "new_users" RENAME TO "users";

-- Criação do índice único no campo `email`
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");