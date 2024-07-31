/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `activities` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "number" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "activities_number_key" ON "activities"("number");
