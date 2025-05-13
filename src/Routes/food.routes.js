import express from 'express'

import { deleteFood, foodCreate, foodDetail, foodRead, getAllFood, getsevenFood, getSuggestionFood, subcategoryReadByIdForFood, UpdateFood } from '../controller/food.controller.js'
import uploads from '../utility/multer.js'
import { checkAuth } from '../middleware/checkToken.js'

const foodRouter = express.Router()

// foodRouter.post('/create',uploads.single("image"),checkAuth,foodCreate)

foodRouter.post('/create',uploads.single("image"),foodCreate)
foodRouter.get('/read',foodRead)
foodRouter.get('/subcategories/:subCategoryId', subcategoryReadByIdForFood)
foodRouter.get('/getfood',getAllFood)
foodRouter.get('/getSuggestion',getSuggestionFood)
foodRouter.get('/offerfood',getsevenFood)
foodRouter.get('/getsinglefood/:id',foodDetail)
foodRouter.delete('/deleteFood/:id',deleteFood)
foodRouter.put('/updateFood/:id',UpdateFood)



export default foodRouter
