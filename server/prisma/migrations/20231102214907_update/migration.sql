-- DropForeignKey
ALTER TABLE "Concert" DROP CONSTRAINT "Concert_bandId_fkey";

-- DropForeignKey
ALTER TABLE "Concert" DROP CONSTRAINT "Concert_tourManagerId_fkey";

-- DropForeignKey
ALTER TABLE "Salary" DROP CONSTRAINT "Salary_bandId_fkey";

-- DropForeignKey
ALTER TABLE "Salary" DROP CONSTRAINT "Salary_concertId_fkey";

-- DropForeignKey
ALTER TABLE "Salary" DROP CONSTRAINT "Salary_tourManagerId_fkey";

-- AddForeignKey
ALTER TABLE "Concert" ADD CONSTRAINT "Concert_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concert" ADD CONSTRAINT "Concert_tourManagerId_fkey" FOREIGN KEY ("tourManagerId") REFERENCES "TourManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_tourManagerId_fkey" FOREIGN KEY ("tourManagerId") REFERENCES "TourManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert"("id") ON DELETE CASCADE ON UPDATE CASCADE;
