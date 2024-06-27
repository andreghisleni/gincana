-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('ANIMATED', 'ORGANIZED');

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "team_id" TEXT NOT NULL,
    "elector_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "save_score" BOOLEAN NOT NULL DEFAULT true,
    "save_report" BOOLEAN NOT NULL DEFAULT true,
    "save_vote" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "votes_team_id_elector_id_type_key" ON "votes"("team_id", "elector_id", "type");

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_elector_id_fkey" FOREIGN KEY ("elector_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
