/*
  Warnings:

  - You are about to drop the column `typeSchemaTypeShortCode` on the `SubTypes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubTypes" (
    "shortCode" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "typeSchemaId" INTEGER NOT NULL,
    CONSTRAINT "SubTypes_typeSchemaId_fkey" FOREIGN KEY ("typeSchemaId") REFERENCES "TypeSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SubTypes" ("description", "shortCode", "typeSchemaId") SELECT "description", "shortCode", "typeSchemaId" FROM "SubTypes";
DROP TABLE "SubTypes";
ALTER TABLE "new_SubTypes" RENAME TO "SubTypes";
CREATE UNIQUE INDEX "SubTypes_shortCode_key" ON "SubTypes"("shortCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
