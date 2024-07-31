/*
  Warnings:

  - A unique constraint covering the columns `[activity_id,name]` on the table `activity_products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "ScoreType" ADD VALUE 'PRICE';

-- CreateIndex
CREATE UNIQUE INDEX "activity_products_activity_id_name_key" ON "activity_products"("activity_id", "name");
