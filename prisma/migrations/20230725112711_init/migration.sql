/*
  Warnings:

  - You are about to drop the `NumberRanges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NumberRangeToNumberRanges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `numberRangesId` on the `Project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_NumberRangeToNumberRanges_B_index";

-- DropIndex
DROP INDEX "_NumberRangeToNumberRanges_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "NumberRanges";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_NumberRangeToNumberRanges";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "NumberSchema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NumberRangeToNumberSchema" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_NumberRangeToNumberSchema_A_fkey" FOREIGN KEY ("A") REFERENCES "NumberRange" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NumberRangeToNumberSchema_B_fkey" FOREIGN KEY ("B") REFERENCES "NumberSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobNo" INTEGER,
    "jobName" TEXT,
    "jobCode" TEXT NOT NULL,
    "volumeSchemaId" INTEGER NOT NULL,
    "NumberSchemaId" INTEGER,
    CONSTRAINT "Project_volumeSchemaId_fkey" FOREIGN KEY ("volumeSchemaId") REFERENCES "VolumeSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_NumberSchemaId_fkey" FOREIGN KEY ("NumberSchemaId") REFERENCES "NumberSchema" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("id", "jobCode", "jobName", "jobNo", "volumeSchemaId") SELECT "id", "jobCode", "jobName", "jobNo", "volumeSchemaId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_jobCode_key" ON "Project"("jobCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_NumberRangeToNumberSchema_AB_unique" ON "_NumberRangeToNumberSchema"("A", "B");

-- CreateIndex
CREATE INDEX "_NumberRangeToNumberSchema_B_index" ON "_NumberRangeToNumberSchema"("B");
