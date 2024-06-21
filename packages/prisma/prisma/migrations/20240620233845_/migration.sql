-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('DEFAULT', 'ACTIVITY', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'DEFAULT';

-- CreateTable
CREATE TABLE "activity_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActivityToActivityGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToActivityGroup_AB_unique" ON "_ActivityToActivityGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToActivityGroup_B_index" ON "_ActivityToActivityGroup"("B");

-- AddForeignKey
ALTER TABLE "_ActivityToActivityGroup" ADD CONSTRAINT "_ActivityToActivityGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToActivityGroup" ADD CONSTRAINT "_ActivityToActivityGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "activity_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
