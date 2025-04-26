-- Criação da nova tabela com a coluna `password` obrigatória
CREATE TABLE "new_users" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL
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