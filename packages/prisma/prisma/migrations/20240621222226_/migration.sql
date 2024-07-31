/*
  Warnings:

  - You are about to drop the column `descriptiion` on the `report_motives` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "report_motives" DROP COLUMN "descriptiion",
ADD COLUMN     "description" TEXT;
