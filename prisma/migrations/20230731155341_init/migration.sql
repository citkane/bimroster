-- AlterTable
ALTER TABLE "Project" ADD COLUMN "roleShortCode" TEXT;

-- CreateTable
CREATE TABLE "_ProjectToRole" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProjectToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role" ("shortCode") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToRole_AB_unique" ON "_ProjectToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToRole_B_index" ON "_ProjectToRole"("B");
