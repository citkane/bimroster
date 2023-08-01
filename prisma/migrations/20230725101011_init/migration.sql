/*
  Warnings:

  - The primary key for the `TypeSchema` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `TypeSchema` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `TypeSchema` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `typeSchemaId` to the `SubTypes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TypeSchema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "typeShortCode" TEXT NOT NULL,
    CONSTRAINT "TypeSchema_typeShortCode_fkey" FOREIGN KEY ("typeShortCode") REFERENCES "Type" ("shortCode") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TypeSchema" ("description", "typeShortCode") SELECT "description", "typeShortCode" FROM "TypeSchema";
DROP TABLE "TypeSchema";
ALTER TABLE "new_TypeSchema" RENAME TO "TypeSchema";
CREATE UNIQUE INDEX "TypeSchema_typeShortCode_key" ON "TypeSchema"("typeShortCode");
CREATE TABLE "new_SubTypes" (
    "shortCode" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "typeSchemaId" INTEGER NOT NULL,
    "typeSchemaTypeShortCode" TEXT NOT NULL,
    CONSTRAINT "SubTypes_typeSchemaId_fkey" FOREIGN KEY ("typeSchemaId") REFERENCES "TypeSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SubTypes" ("description", "shortCode", "typeSchemaTypeShortCode") SELECT "description", "shortCode", "typeSchemaTypeShortCode" FROM "SubTypes";
DROP TABLE "SubTypes";
ALTER TABLE "new_SubTypes" RENAME TO "SubTypes";
CREATE UNIQUE INDEX "SubTypes_shortCode_key" ON "SubTypes"("shortCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
