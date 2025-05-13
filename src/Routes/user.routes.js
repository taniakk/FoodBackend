import express from "express"
import { getLogUser, handleDelete, handleGetData, handleLogin, handleRegister, handleUpdate } from "../controller/user.controller.js"
import {checkAuth} from '../middleware/checkToken.js'

const userRouter = express.Router()

userRouter.post('/register',handleRegister)
userRouter.post('/login',handleLogin)
userRouter.get('/getdata', checkAuth,handleGetData)
userRouter.put('/update/:id',handleUpdate)
userRouter.delete('/deleteUser',handleDelete)
userRouter.get('/getLog',checkAuth,getLogUser)

export default userRouter