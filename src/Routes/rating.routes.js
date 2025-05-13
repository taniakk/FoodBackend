import express from 'express'
import { addRating, getRating, getRatingByID } from '../controller/rating.controller.js'
import { checkAuth } from '../middleware/checkToken.js'
const RatingRouter = express.Router()

RatingRouter.post('/AddRating',checkAuth,addRating)
RatingRouter.get('/getRating',getRating)
RatingRouter.get('/getRatingByID/:id',getRatingByID)

export default RatingRouter