-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shortCode" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nameFirst" TEXT NOT NULL,
    "nameLast" TEXT NOT NULL,
    "userId" INTEGER,
    "companyId" INTEGER,
    CONSTRAINT "Person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Person_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleId" INTEGER,
    "companyId" INTEGER,
    "roleShortCode" TEXT,
    CONSTRAINT "User_roleShortCode_fkey" FOREIGN KEY ("roleShortCode") REFERENCES "Role" ("shortCode") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobNo" INTEGER,
    "jobName" TEXT,
    "jobCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Volume" (
    "shortCode" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Volume_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VolumeSchema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Levels" (
    "shortCode" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Type" (
    "shortCode" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "SubTypes" (
    "shortCode" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "typeSchemaTypeShortCode" TEXT NOT NULL,
    CONSTRAINT "SubTypes_typeSchemaTypeShortCode_fkey" FOREIGN KEY ("typeSchemaTypeShortCode") REFERENCES "TypeSchema" ("typeShortCode") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TypeSchema" (
    "typeShortCode" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "TypeSchema_typeShortCode_fkey" FOREIGN KEY ("typeShortCode") REFERENCES "Type" ("shortCode") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "shortCode" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Number" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "typePrefix" TEXT,
    "value" TEXT NOT NULL,
    CONSTRAINT "Number_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StatusStage" (
    "shortCode" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "revPrefix" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StatusCodes" (
    "shortCode" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "statusStageShortCode" TEXT NOT NULL,
    CONSTRAINT "StatusCodes_statusStageShortCode_fkey" FOREIGN KEY ("statusStageShortCode") REFERENCES "StatusStage" ("shortCode") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "project" TEXT NOT NULL,
    "projectCode" TEXT NOT NULL,
    "originator" TEXT NOT NULL,
    "companyCode" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "numberId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "revisionMajor" INTEGER NOT NULL,
    "revisionMinor" INTEGER,
    CONSTRAINT "Document_numberId_fkey" FOREIGN KEY ("numberId") REFERENCES "Number" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CompanyToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CompanyToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CompanyToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProjectToVolumeSchema" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProjectToVolumeSchema_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToVolumeSchema_B_fkey" FOREIGN KEY ("B") REFERENCES "VolumeSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_VolumeToVolumeSchema" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_VolumeToVolumeSchema_A_fkey" FOREIGN KEY ("A") REFERENCES "Volume" ("shortCode") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_VolumeToVolumeSchema_B_fkey" FOREIGN KEY ("B") REFERENCES "VolumeSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_shortCode_key" ON "Company"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "Person_userId_key" ON "Person"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_jobCode_key" ON "Project"("jobCode");

-- CreateIndex
CREATE UNIQUE INDEX "Volume_shortCode_key" ON "Volume"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "Volume_description_key" ON "Volume"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Levels_shortCode_key" ON "Levels"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "Type_shortCode_key" ON "Type"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "SubTypes_shortCode_key" ON "SubTypes"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "Role_shortCode_key" ON "Role"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "StatusStage_shortCode_key" ON "StatusStage"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "StatusCodes_shortCode_key" ON "StatusCodes"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "Document_id_key" ON "Document"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToProject_AB_unique" ON "_CompanyToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToProject_B_index" ON "_CompanyToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToVolumeSchema_AB_unique" ON "_ProjectToVolumeSchema"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToVolumeSchema_B_index" ON "_ProjectToVolumeSchema"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VolumeToVolumeSchema_AB_unique" ON "_VolumeToVolumeSchema"("A", "B");

-- CreateIndex
CREATE INDEX "_VolumeToVolumeSchema_B_index" ON "_VolumeToVolumeSchema"("B");
