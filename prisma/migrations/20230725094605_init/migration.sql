/*
  Warnings:

  - Made the column `volumeSchemaId` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobNo" INTEGER,
    "jobName" TEXT,
    "jobCode" TEXT NOT NULL,
    "volumeSchemaId" INTEGER NOT NULL,
    CONSTRAINT "Project_volumeSchemaId_fkey" FOREIGN KEY ("volumeSchemaId") REFERENCES "VolumeSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("id", "jobCode", "jobName", "jobNo", "volumeSchemaId") SELECT "id", "jobCode", "jobName", "jobNo", "volumeSchemaId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_jobCode_key" ON "Project"("jobCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
