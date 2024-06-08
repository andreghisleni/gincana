/*
  Warnings:

  - A unique constraint covering the columns `[activity_id,team_id]` on the table `scores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "scores_activity_id_team_id_key" ON "scores"("activity_id", "team_id");
