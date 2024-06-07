/*
  Warnings:

  - Added the required column `number_of_teams` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "number_of_teams" INTEGER NOT NULL;
