/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `Planned` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Planned_taskId_key" ON "Planned"("taskId");
