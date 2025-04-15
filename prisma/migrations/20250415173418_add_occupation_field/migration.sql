/*
  Warnings:

  - You are about to drop the column `address` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Account_email_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "email",
DROP COLUMN "phone",
DROP COLUMN "postalCode",
DROP COLUMN "state",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "occupation" TEXT;
