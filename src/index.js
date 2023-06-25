import express from "express";
import cors from "cors";
import usuarioRuta from "./routes/usuarioRuta.js"
import dotenv from "dotenv"
import ranchoRuta from "./routes/ranchoRuta.js"
import reservaRuta from "./routes/reservaRuta.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())



app.use("/usuarios", usuarioRuta)
app.use("/ranchos", ranchoRuta)
app.use("/reservas", reservaRuta)

app.listen(5000)
