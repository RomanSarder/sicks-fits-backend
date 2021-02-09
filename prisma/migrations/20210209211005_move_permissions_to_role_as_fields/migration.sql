/*
  Warnings:

  - You are about to drop the column `permissions` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `permissions` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "permissions",
ADD COLUMN     "canManageProducts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canSeeOtherUsers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageUsers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageRoles" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageCart" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageOrders" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "permissions";

-- DropEnum
DROP TYPE "Permission";
