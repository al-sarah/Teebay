-- CreateEnum
CREATE TYPE "Status" AS ENUM ('bought', 'sold', 'borrowed', 'lent', 'available');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'available';
