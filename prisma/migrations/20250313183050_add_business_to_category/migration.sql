/*
  Warnings:

  - Added the required column `business_id` to the `service_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_categories" ADD COLUMN     "business_id" INTEGER NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "service_categories" ADD CONSTRAINT "service_categories_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
