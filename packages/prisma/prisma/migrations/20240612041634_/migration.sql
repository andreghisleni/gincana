-- CreateTable
CREATE TABLE "_ScoreToTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScoreToTeams_AB_unique" ON "_ScoreToTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_ScoreToTeams_B_index" ON "_ScoreToTeams"("B");

-- AddForeignKey
ALTER TABLE "_ScoreToTeams" ADD CONSTRAINT "_ScoreToTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "scores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScoreToTeams" ADD CONSTRAINT "_ScoreToTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
