/*
  Warnings:

  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.
  - Added the required column `nameUser` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "nameUser" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Post" ("content", "createdAt", "date", "id", "idUser", "title") SELECT "content", "createdAt", "date", "id", "idUser", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_idUser_key" ON "Post"("idUser");
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");
CREATE UNIQUE INDEX "Post_content_key" ON "Post"("content");
CREATE UNIQUE INDEX "Post_nameUser_key" ON "Post"("nameUser");
CREATE UNIQUE INDEX "Post_date_key" ON "Post"("date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
