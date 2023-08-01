-- AlterTable
ALTER TABLE "Type" ADD COLUMN "tracked" BOOLEAN;

-- CreateTable
CREATE TABLE "NumberRange" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "min" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "NumberRange_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NumberRanges" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NumberRangeToNumberRanges" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_NumberRangeToNumberRanges_A_fkey" FOREIGN KEY ("A") REFERENCES "NumberRange" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NumberRangeToNumberRanges_B_fkey" FOREIGN KEY ("B") REFERENCES "NumberRanges" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobNo" INTEGER,
    "jobName" TEXT,
    "jobCode" TEXT NOT NULL,
    "volumeSchemaId" INTEGER NOT NULL,
    "numberRangesId" INTEGER,
    CONSTRAINT "Project_volumeSchemaId_fkey" FOREIGN KEY ("volumeSchemaId") REFERENCES "VolumeSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_numberRangesId_fkey" FOREIGN KEY ("numberRangesId") REFERENCES "NumberRanges" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("id", "jobCode", "jobName", "jobNo", "volumeSchemaId") SELECT "id", "jobCode", "jobName", "jobNo", "volumeSchemaId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_jobCode_key" ON "Project"("jobCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_NumberRangeToNumberRanges_AB_unique" ON "_NumberRangeToNumberRanges"("A", "B");

-- CreateIndex
CREATE INDEX "_NumberRangeToNumberRanges_B_index" ON "_NumberRangeToNumberRanges"("B");
