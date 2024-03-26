/*
  Warnings:

  - The `user_id` column on the `AuditLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Run` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Run" DROP CONSTRAINT "Run_dataset_id_fkey";

-- DropForeignKey
ALTER TABLE "Run" DROP CONSTRAINT "Run_user_id_fkey";

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER;

-- DropTable
DROP TABLE "Run";

-- CreateTable
CREATE TABLE "Runs" (
    "run_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dataset_id" INTEGER NOT NULL,

    CONSTRAINT "Runs_pkey" PRIMARY KEY ("run_id")
);

-- AddForeignKey
ALTER TABLE "Runs" ADD CONSTRAINT "Runs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Runs" ADD CONSTRAINT "Runs_dataset_id_fkey" FOREIGN KEY ("dataset_id") REFERENCES "Datasets"("dataset_id") ON DELETE RESTRICT ON UPDATE CASCADE;
