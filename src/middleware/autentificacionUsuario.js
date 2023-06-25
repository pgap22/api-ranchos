import {prisma} from "../db/prisma.js"
import jwt from "jsonwebtoken"

async function verificarMiddleware(req, res,next) {
    
    console.log(req.headers.authorization)
    let token = req.headers.authorization
    

    if (!token || !token.startsWith('Bearer')) {
        return res.status(400).send("ERROR DE TOKEN")
    }

     //Si tiene bearer
     token = token.split("Bearer ")
     console.log(token)
    token = token[1]


    try {
        const {id} = jwt.verify(token, process.env.SECRETA)

        const usuario = await prisma.usuario.findFirst({where: {id}})

        if (!usuario) return res.status(400).json({messsage: "ERROR"})

        req.usuario = usuario


        console.log(usuario)
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Token no valido"})
    }
    

    next()
}

async function adminMiddleware(req, res,next){
    const usuario = req.usuario
    if (usuario.rol == "admin") return next()
    return res.status(400).send("no sos admin")
}

export {
    verificarMiddleware,
    adminMiddleware
}