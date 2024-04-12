/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `Important` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Important_taskId_key" ON "Important"("taskId");
