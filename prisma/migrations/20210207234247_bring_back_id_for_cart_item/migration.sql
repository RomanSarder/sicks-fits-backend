/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[id]` on the table `CartItem`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN "id" SERIAL;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem.id_unique" ON "CartItem"("id");
