/*
  Warnings:

  - The migration will change the primary key for the `CartItem` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("itemId", "userId");
