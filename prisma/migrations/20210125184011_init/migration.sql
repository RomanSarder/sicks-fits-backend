-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN', 'USER', 'ITEMCREATE', 'ITEMDELETE', 'ITEMUPDATE', 'PERMISSIONUPDATE');

-- CreateTable
CREATE TABLE "Item" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "largeImage" TEXT,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" DECIMAL(65,30),
    "permissions" "Permission"[],

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
