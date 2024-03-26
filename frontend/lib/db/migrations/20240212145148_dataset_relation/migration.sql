/*
  Warnings:

  - A unique constraint covering the columns `[template_id]` on the table `Datasets` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Datasets" ADD COLUMN     "template_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Datasets_template_id_key" ON "Datasets"("template_id");

-- AddForeignKey
ALTER TABLE "Datasets" ADD CONSTRAINT "Datasets_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "DataTemplates"("datatemplate_id") ON DELETE SET NULL ON UPDATE CASCADE;
