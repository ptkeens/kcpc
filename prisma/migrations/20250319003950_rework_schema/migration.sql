/*
  Warnings:

  - You are about to drop the column `addedByUserId` on the `kits` table. All the data in the column will be lost.
  - You are about to drop the column `kitFamilyId` on the `kits` table. All the data in the column will be lost.
  - You are about to drop the column `addedByUserId` on the `manufacturers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `manufacturers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `manufacturers` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturerPartNumber` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `s3Key` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isEnabled` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `kitFamily` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partGroupPartKits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partGroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partKits` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `added_by_user_id` to the `kits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kit_family_id` to the `kits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `added_by_user_id` to the `manufacturers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `manufacturers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "kitFamily" DROP CONSTRAINT "kitFamily_addedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "kitFamily" DROP CONSTRAINT "kitFamily_manufacturerId_fkey";

-- DropForeignKey
ALTER TABLE "kits" DROP CONSTRAINT "kits_addedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "kits" DROP CONSTRAINT "kits_kitFamilyId_fkey";

-- DropForeignKey
ALTER TABLE "manufacturers" DROP CONSTRAINT "manufacturers_addedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "partGroupPartKits" DROP CONSTRAINT "partGroupPartKits_partGroupId_fkey";

-- DropForeignKey
ALTER TABLE "partGroupPartKits" DROP CONSTRAINT "partGroupPartKits_partKitId_fkey";

-- DropForeignKey
ALTER TABLE "partKits" DROP CONSTRAINT "partKits_kitId_fkey";

-- DropForeignKey
ALTER TABLE "partKits" DROP CONSTRAINT "partKits_partId_fkey";

-- DropIndex
DROP INDEX "kits_addedByUserId_idx";

-- DropIndex
DROP INDEX "kits_kitFamilyId_idx";

-- DropIndex
DROP INDEX "manufacturers_addedByUserId_idx";

-- AlterTable
ALTER TABLE "kits" DROP COLUMN "addedByUserId",
DROP COLUMN "kitFamilyId",
ADD COLUMN     "added_by_user_id" UUID NOT NULL,
ADD COLUMN     "kit_family_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "manufacturers" DROP COLUMN "addedByUserId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "added_by_user_id" UUID NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "parts" DROP COLUMN "manufacturerPartNumber",
DROP COLUMN "s3Key",
ADD COLUMN     "manufacturer_part_number" TEXT,
ADD COLUMN     "s3_key" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "isEnabled",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "kitFamily";

-- DropTable
DROP TABLE "partGroupPartKits";

-- DropTable
DROP TABLE "partGroups";

-- DropTable
DROP TABLE "partKits";

-- CreateTable
CREATE TABLE "kit_family" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer_id" UUID NOT NULL,
    "added_by_user_id" UUID NOT NULL,

    CONSTRAINT "kit_family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part_kits" (
    "id" UUID NOT NULL,
    "kit_part_number" TEXT NOT NULL,
    "part_id" UUID NOT NULL,
    "kit_id" UUID NOT NULL,

    CONSTRAINT "part_kits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part_groups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "display_order" INTEGER NOT NULL,
    "kit_id" UUID NOT NULL,

    CONSTRAINT "part_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part_group_part_kits" (
    "id" UUID NOT NULL,
    "part_group_id" UUID NOT NULL,
    "part_kit_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "part_group_part_kits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part_connections" (
    "id" UUID NOT NULL,
    "description" TEXT,
    "source_part_kit_id" UUID NOT NULL,
    "target_part_kit_id" UUID NOT NULL,

    CONSTRAINT "part_connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part_connection_fasteners" (
    "id" UUID NOT NULL,
    "part_connection_id" UUID NOT NULL,
    "fastener_part_kit_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "torque_value" DOUBLE PRECISION,
    "torque_unit" TEXT,
    "notes" TEXT,

    CONSTRAINT "part_connection_fasteners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "kit_family_manufacturer_id_idx" ON "kit_family"("manufacturer_id");

-- CreateIndex
CREATE INDEX "kit_family_added_by_user_id_idx" ON "kit_family"("added_by_user_id");

-- CreateIndex
CREATE INDEX "part_kits_part_id_idx" ON "part_kits"("part_id");

-- CreateIndex
CREATE INDEX "part_kits_kit_id_idx" ON "part_kits"("kit_id");

-- CreateIndex
CREATE INDEX "part_groups_kit_id_idx" ON "part_groups"("kit_id");

-- CreateIndex
CREATE INDEX "part_group_part_kits_part_group_id_idx" ON "part_group_part_kits"("part_group_id");

-- CreateIndex
CREATE INDEX "part_group_part_kits_part_kit_id_idx" ON "part_group_part_kits"("part_kit_id");

-- CreateIndex
CREATE INDEX "part_connections_source_part_kit_id_idx" ON "part_connections"("source_part_kit_id");

-- CreateIndex
CREATE INDEX "part_connections_target_part_kit_id_idx" ON "part_connections"("target_part_kit_id");

-- CreateIndex
CREATE INDEX "part_connection_fasteners_part_connection_id_idx" ON "part_connection_fasteners"("part_connection_id");

-- CreateIndex
CREATE INDEX "part_connection_fasteners_fastener_part_kit_id_idx" ON "part_connection_fasteners"("fastener_part_kit_id");

-- CreateIndex
CREATE INDEX "kits_kit_family_id_idx" ON "kits"("kit_family_id");

-- CreateIndex
CREATE INDEX "kits_added_by_user_id_idx" ON "kits"("added_by_user_id");

-- CreateIndex
CREATE INDEX "manufacturers_added_by_user_id_idx" ON "manufacturers"("added_by_user_id");

-- AddForeignKey
ALTER TABLE "manufacturers" ADD CONSTRAINT "manufacturers_added_by_user_id_fkey" FOREIGN KEY ("added_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kit_family" ADD CONSTRAINT "kit_family_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kit_family" ADD CONSTRAINT "kit_family_added_by_user_id_fkey" FOREIGN KEY ("added_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits" ADD CONSTRAINT "kits_kit_family_id_fkey" FOREIGN KEY ("kit_family_id") REFERENCES "kit_family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits" ADD CONSTRAINT "kits_added_by_user_id_fkey" FOREIGN KEY ("added_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_kits" ADD CONSTRAINT "part_kits_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_kits" ADD CONSTRAINT "part_kits_kit_id_fkey" FOREIGN KEY ("kit_id") REFERENCES "kits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_group_part_kits" ADD CONSTRAINT "part_group_part_kits_part_group_id_fkey" FOREIGN KEY ("part_group_id") REFERENCES "part_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_group_part_kits" ADD CONSTRAINT "part_group_part_kits_part_kit_id_fkey" FOREIGN KEY ("part_kit_id") REFERENCES "part_kits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_connections" ADD CONSTRAINT "part_connections_source_part_kit_id_fkey" FOREIGN KEY ("source_part_kit_id") REFERENCES "part_kits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_connections" ADD CONSTRAINT "part_connections_target_part_kit_id_fkey" FOREIGN KEY ("target_part_kit_id") REFERENCES "part_kits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_connection_fasteners" ADD CONSTRAINT "part_connection_fasteners_part_connection_id_fkey" FOREIGN KEY ("part_connection_id") REFERENCES "part_connections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_connection_fasteners" ADD CONSTRAINT "part_connection_fasteners_fastener_part_kit_id_fkey" FOREIGN KEY ("fastener_part_kit_id") REFERENCES "part_kits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
