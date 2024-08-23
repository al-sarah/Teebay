/*
  Warnings:

  - You are about to drop the column `summary` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_productId_fkey";
DROP TABLE "ProductCategory";
DROP TABLE "Category";


CREATE TYPE "Category" AS ENUM ('ELECTRONICS', 'FURNITURE', 'HOME_APPLIANCES', 'SPORTING_GOODS', 'OUTDOOR', 'TOYS');



-- AlterTable
ALTER TABLE "Product" DROP COLUMN "summary",
ADD COLUMN     "categories" "Category"[];

-- DropTable


-- DropTable
