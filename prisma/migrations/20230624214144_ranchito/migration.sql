-- CreateTable
CREATE TABLE `rancho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario_propietario` INTEGER NOT NULL,
    `nombre_rancho` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(255) NOT NULL,
    `direccion` VARCHAR(255) NOT NULL,
    `precio_por_noche` FLOAT NOT NULL,
    `cantidad_huesped` INTEGER NOT NULL,
    `verificado` BIT(1) NOT NULL,

    INDEX `fk_rancho_usuario_propietario`(`id_usuario_propietario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_rancho` INTEGER NOT NULL,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NOT NULL,
    `precio_total` FLOAT NOT NULL,

    INDEX `fk_reserva_rancho`(`id_rancho`),
    INDEX `fk_reserva_usuario`(`id_usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `rol` VARCHAR(50) NOT NULL DEFAULT 'usuario',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rancho` ADD CONSTRAINT `fk_rancho_usuario_propietario` FOREIGN KEY (`id_usuario_propietario`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reserva` ADD CONSTRAINT `fk_reserva_rancho` FOREIGN KEY (`id_rancho`) REFERENCES `rancho`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reserva` ADD CONSTRAINT `fk_reserva_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
