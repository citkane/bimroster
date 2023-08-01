/*
  Warnings:

  - You are about to drop the `_ProjectToVolumeSchema` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_ProjectToVolumeSchema_B_index";

-- DropIndex
DROP INDEX "_ProjectToVolumeSchema_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProjectToVolumeSchema";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobNo" INTEGER,
    "jobName" TEXT,
    "jobCode" TEXT NOT NULL,
    "volumeSchemaId" INTEGER,
    CONSTRAINT "Project_volumeSchemaId_fkey" FOREIGN KEY ("volumeSchemaId") REFERENCES "VolumeSchema" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("id", "jobCode", "jobName", "jobNo") SELECT "id", "jobCode", "jobName", "jobNo" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_jobCode_key" ON "Project"("jobCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
