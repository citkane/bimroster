/*
  Warnings:

  - You are about to drop the `Levels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Levels";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Level" (
    "shortCode" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_shortCode_key" ON "Level"("shortCode");
