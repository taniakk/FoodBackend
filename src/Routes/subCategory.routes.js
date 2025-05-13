import express from 'express'
// import subCategory from '../models/subCategory.model'
import { CategoryReadById, CategoryReadByIdForsub, subCategoryCreate,subcategoryDelete,subCategoryRead } from '../controller/subCategory.controller.js'
import { checkAuth } from '../middleware/checkToken.js'

const subCategoryRouter = express.Router()

subCategoryRouter.post('/subCreate',subCategoryCreate)
subCategoryRouter.get('/subRead',checkAuth,subCategoryRead)

subCategoryRouter.get("/categories/:categoryId/subcategories",CategoryReadById);
subCategoryRouter.get("/categories/:categoryId",CategoryReadByIdForsub)
subCategoryRouter.delete('/subcategorieDelete/:id', subcategoryDelete)

export default subCategoryRouter