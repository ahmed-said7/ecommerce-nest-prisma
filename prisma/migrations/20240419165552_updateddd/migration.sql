/*
  Warnings:

  - You are about to drop the column `pricaAfterDiscount` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "pricaAfterDiscount",
ADD COLUMN     "priceAfterDiscount" DOUBLE PRECISION;
