/*
  Warnings:

  - The primary key for the `activities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `activities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `businesses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `businesses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `contacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `services` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `contact_id` on the `activities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `business_id` on the `activities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `business_id` on the `services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_business_id_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_business_id_fkey";

-- AlterTable
ALTER TABLE "activities" DROP CONSTRAINT "activities_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "contact_id",
ADD COLUMN     "contact_id" INTEGER NOT NULL,
DROP COLUMN "business_id",
ADD COLUMN     "business_id" INTEGER NOT NULL,
ADD CONSTRAINT "activities_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "businesses" DROP CONSTRAINT "businesses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "businesses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "services" DROP CONSTRAINT "services_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "business_id",
ADD COLUMN     "business_id" INTEGER NOT NULL,
ADD CONSTRAINT "services_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
