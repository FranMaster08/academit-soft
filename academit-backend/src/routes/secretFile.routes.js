import { Router } from 'express'
import { SecretController } from '../controller/index.js'
const routes = Router()

routes.get('/list', SecretController.getAllFilesNotFilter)
routes.get('/data', SecretController.getAllFiles)

export { routes }
