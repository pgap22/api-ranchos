import z from "zod"
import {prisma} from "../db/prisma.js"


//Crear
const crearRancho = async (req, res) => {
    const ranchoEsquema = z.object({
        nombre_rancho: z.string().nonempty(),
        descripcion: z.string().nonempty(),
        direccion: z.string().nonempty(),
        precio_por_noche: z.number().min(1),
        cantidad_huesped: z.number().min(1)
    })

    //obtener
    const datos = req.body

    try {
    //valido
    ranchoEsquema.parse(datos)
    datos.id_usuario_propietario = req.usuario.id

    //Insertar
    const ranchoCreado = await prisma.rancho.create({data: datos})

    return res.status(201).json(ranchoCreado)
    
    } catch (error) {
        console.log(error)
        return res.status(400).send("ERROR")
    }
    


}

//Leer
const leerRancho = async (req, res) => {
    try {
     
    const ranchoLeido = await prisma.rancho.findMany()
    return res.status(200).json(ranchoLeido)

    } catch (error) {
        return res.status(400).json({message: "ERROR"})    
    }

}

//Leer rancho individual
const individualRancho = async (req,res) => {
    
    try {
        let {id} = req.params
        id = parseInt(id)
        const ranchoIndividual = await prisma.rancho.findFirst({where: {id}})
        return res.status(200).json(ranchoIndividual)

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "ERROR"})
    }
}

//Editar
const editarRancho = async (req, res) => {
    const ranchoEsquema = z.object({
        nombre_rancho: z.string().nonempty().optional(),
        descripcion: z.string().nonempty().optional(),
        direccion: z.string().nonempty().optional(),
        precio_por_noche: z.number().min(1).optional(),
        cantidad_huesped: z.number().min(1).optional()
    })

    //obtener
    const datos = req.body

    try {
        
        //valido
        ranchoEsquema.parse(datos)
    
        //insertar
        let {id} = req.params
        id = parseInt(id)
        const ranchoEditado = await prisma.rancho.update({where: {id}, data: datos})
        return res.status(200).json(ranchoEditado)

    } catch (error) {
        console.log(error)
        return res.status(400).json({mesagge: "ERROR"})
    }


}

//Borrar
const borrarRancho = async (req, res) => {
    
    try {
        let {id} = req.params
        id = parseInt(id)

        const ranchoBorrado = await prisma.rancho.delete({where: {id}})
        return res.status(200).json(ranchoBorrado)
    
        } catch (error) {
            return res.status(400).json({message: "ERROR"})    
        }
}

export {
    crearRancho,
    leerRancho,
    individualRancho,
    editarRancho,
    borrarRancho
}