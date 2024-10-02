/*
  Warnings:

  - The values [STOPPED] on the enum `BookReadStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookReadStatus_new" AS ENUM ('NOT_STARTED', 'READING', 'FINISHED');
ALTER TABLE "UserBook" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "UserBook" ALTER COLUMN "status" TYPE "BookReadStatus_new" USING ("status"::text::"BookReadStatus_new");
ALTER TYPE "BookReadStatus" RENAME TO "BookReadStatus_old";
ALTER TYPE "BookReadStatus_new" RENAME TO "BookReadStatus";
DROP TYPE "BookReadStatus_old";
ALTER TABLE "UserBook" ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED';
COMMIT;
