/*
  Warnings:

  - You are about to drop the column `priceAfterDiscount` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "priceAfterDiscount",
ADD COLUMN     "discount" DOUBLE PRECISION DEFAULT 0;
