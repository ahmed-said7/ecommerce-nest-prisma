-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('admin', 'user', 'manager');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "UserType" NOT NULL DEFAULT 'user';
