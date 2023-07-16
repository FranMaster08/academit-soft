import express from 'express'
import routes from '../routes/index.js'
import cors from "cors";
import { verificationToken, errorMiddleware } from '../middleware/index.js'
const app = express()
// configuracion de middlewares
app.use(cors({ origin: '*' }));
app.use(verificationToken)
// configuracion de rutas
app.use('/', routes)
app.use(errorMiddleware)
export { app }
