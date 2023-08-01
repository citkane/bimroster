-- CreateTable
CREATE TABLE "_ProjectToType" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProjectToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type" ("shortCode") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToType_AB_unique" ON "_ProjectToType"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToType_B_index" ON "_ProjectToType"("B");
