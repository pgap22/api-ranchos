/*
  Warnings:

  - Added the required column `cantidad_huesped` to the `reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rancho` MODIFY `verificado` BIT(1) NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `reserva` ADD COLUMN `cantidad_huesped` INTEGER NOT NULL;
