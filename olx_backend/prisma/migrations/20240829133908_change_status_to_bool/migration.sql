/*
  Warnings:

  - You are about to alter the column `status` on the `ads` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "priceNegotiable" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "ads_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ads" ("category", "createdAt", "description", "id", "idUser", "image", "price", "priceNegotiable", "state", "status", "title", "views") SELECT "category", "createdAt", "description", "id", "idUser", "image", "price", "priceNegotiable", "state", "status", "title", "views" FROM "ads";
DROP TABLE "ads";
ALTER TABLE "new_ads" RENAME TO "ads";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
