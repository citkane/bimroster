/*
  Warnings:

  - The primary key for the `Volume` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `A` on the `_VolumeToVolumeSchema` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `id` to the `Volume` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_LevelToProject" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LevelToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Level" ("shortCode") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LevelToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Volume" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shortCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Volume_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Volume" ("companyId", "description", "shortCode") SELECT "companyId", "description", "shortCode" FROM "Volume";
DROP TABLE "Volume";
ALTER TABLE "new_Volume" RENAME TO "Volume";
CREATE UNIQUE INDEX "Volume_description_key" ON "Volume"("description");
CREATE UNIQUE INDEX "Volume_id_shortCode_key" ON "Volume"("id", "shortCode");
CREATE TABLE "new__VolumeToVolumeSchema" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_VolumeToVolumeSchema_A_fkey" FOREIGN KEY ("A") REFERENCES "Volume" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_VolumeToVolumeSchema_B_fkey" FOREIGN KEY ("B") REFERENCES "VolumeSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__VolumeToVolumeSchema" ("A", "B") SELECT "A", "B" FROM "_VolumeToVolumeSchema";
DROP TABLE "_VolumeToVolumeSchema";
ALTER TABLE "new__VolumeToVolumeSchema" RENAME TO "_VolumeToVolumeSchema";
CREATE UNIQUE INDEX "_VolumeToVolumeSchema_AB_unique" ON "_VolumeToVolumeSchema"("A", "B");
CREATE INDEX "_VolumeToVolumeSchema_B_index" ON "_VolumeToVolumeSchema"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_LevelToProject_AB_unique" ON "_LevelToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_LevelToProject_B_index" ON "_LevelToProject"("B");
