-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "token" TEXT
);
INSERT INTO "new_users" ("email", "id", "name", "passwordHash", "state", "token") SELECT "email", "id", "name", "passwordHash", "state", "token" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_token_key" ON "users"("token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
