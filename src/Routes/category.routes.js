import express from 'express'
import { cascadingDelete, categoryCreate, categoryRead } from '../controller/category.controller.js'
import { checkAuth } from '../middleware/checkToken.js'
const categoryRouter = express.Router()

categoryRouter.post('/catCreate',categoryCreate)
categoryRouter.get('/catRead',categoryRead)
categoryRouter.delete('/categories/:id', cascadingDelete)

export default categoryRouter