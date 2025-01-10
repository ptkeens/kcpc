-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufacturers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addedByUserId" UUID NOT NULL,

    CONSTRAINT "manufacturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kitFamily" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturerId" UUID NOT NULL,
    "addedByUserId" UUID NOT NULL,

    CONSTRAINT "kitFamily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kits" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "kitFamilyId" UUID NOT NULL,
    "addedByUserId" UUID NOT NULL,

    CONSTRAINT "kits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturerPartNumber" TEXT,
    "description" TEXT,
    "s3Key" TEXT,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partKits" (
    "id" UUID NOT NULL,
    "kitPartNumber" TEXT NOT NULL,
    "partId" UUID NOT NULL,
    "kitId" UUID NOT NULL,

    CONSTRAINT "partKits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partGroups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL,
    "kitId" UUID NOT NULL,

    CONSTRAINT "partGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partGroupPartKits" (
    "id" UUID NOT NULL,
    "partGroupId" UUID NOT NULL,
    "partKitId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "partGroupPartKits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "manufacturers_name_idx" ON "manufacturers"("name");

-- CreateIndex
CREATE INDEX "manufacturers_addedByUserId_idx" ON "manufacturers"("addedByUserId");

-- CreateIndex
CREATE INDEX "kitFamily_manufacturerId_idx" ON "kitFamily"("manufacturerId");

-- CreateIndex
CREATE INDEX "kitFamily_addedByUserId_idx" ON "kitFamily"("addedByUserId");

-- CreateIndex
CREATE INDEX "kits_kitFamilyId_idx" ON "kits"("kitFamilyId");

-- CreateIndex
CREATE INDEX "kits_addedByUserId_idx" ON "kits"("addedByUserId");

-- CreateIndex
CREATE INDEX "partKits_partId_idx" ON "partKits"("partId");

-- CreateIndex
CREATE INDEX "partKits_kitId_idx" ON "partKits"("kitId");

-- CreateIndex
CREATE INDEX "partGroups_kitId_idx" ON "partGroups"("kitId");

-- CreateIndex
CREATE INDEX "partGroupPartKits_partGroupId_idx" ON "partGroupPartKits"("partGroupId");

-- CreateIndex
CREATE INDEX "partGroupPartKits_partKitId_idx" ON "partGroupPartKits"("partKitId");

-- AddForeignKey
ALTER TABLE "manufacturers" ADD CONSTRAINT "manufacturers_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kitFamily" ADD CONSTRAINT "kitFamily_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kitFamily" ADD CONSTRAINT "kitFamily_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits" ADD CONSTRAINT "kits_kitFamilyId_fkey" FOREIGN KEY ("kitFamilyId") REFERENCES "kitFamily"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits" ADD CONSTRAINT "kits_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partKits" ADD CONSTRAINT "partKits_partId_fkey" FOREIGN KEY ("partId") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partKits" ADD CONSTRAINT "partKits_kitId_fkey" FOREIGN KEY ("kitId") REFERENCES "kits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partGroupPartKits" ADD CONSTRAINT "partGroupPartKits_partGroupId_fkey" FOREIGN KEY ("partGroupId") REFERENCES "partGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partGroupPartKits" ADD CONSTRAINT "partGroupPartKits_partKitId_fkey" FOREIGN KEY ("partKitId") REFERENCES "partKits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
