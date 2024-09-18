/*
  Warnings:

  - You are about to drop the column `serviceName` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "imagePath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "serviceName",
ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
