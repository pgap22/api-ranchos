import { borrarRancho, crearRancho, editarRancho, individualRancho, leerRancho } from "../controllers/ranchoControlador.js";
import { adminMiddleware, verificarMiddleware } from "../middleware/autentificacionUsuario.js";
import { Router } from "express";

const router = Router()

//Crear
router.post("/",verificarMiddleware, crearRancho)

//Leer
router.get("/",verificarMiddleware, leerRancho)

router.get("/:id",verificarMiddleware, individualRancho)

//Editar
router.patch("/:id",verificarMiddleware, adminMiddleware, editarRancho)

//Borrar
router.delete("/:id", verificarMiddleware, adminMiddleware, borrarRancho)

export default router