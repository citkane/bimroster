/*
  Warnings:

  - You are about to drop the `StatusCodes` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `StatusStage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shortCode` on the `StatusStage` table. All the data in the column will be lost.
  - Added the required column `id` to the `StatusStage` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `StatusStage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "StatusCodes_shortCode_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StatusCodes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "StatusCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shortCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "statusStageId" INTEGER NOT NULL,
    CONSTRAINT "StatusCode_statusStageId_fkey" FOREIGN KEY ("statusStageId") REFERENCES "StatusStage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StatusStage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "revPrefix" TEXT NOT NULL
);
INSERT INTO "new_StatusStage" ("description", "revPrefix") SELECT "description", "revPrefix" FROM "StatusStage";
DROP TABLE "StatusStage";
ALTER TABLE "new_StatusStage" RENAME TO "StatusStage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
