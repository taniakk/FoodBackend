import {validateToken} from './token.js'
import user from '../models/user.model.js'

export async function checkAuth(req,res,next) {
    const token = req.headers.authorization.split(' ')[1]
    // console.log(req.headers.authorization.split(' ')[1])
    // console.log(token);
    

    if(!token){
        return res.status(401).send("Unauthorized")
    } 
    try {
        const userPayload = validateToken(token)
        req.user = userPayload
        // console.log(req.user)
        const {id} = req.user
        const userData = await user.findById(id)
        // console.log(userData)
        if(userData.token === null){
            return res.status(401).send("Unauthorized")
        }
        console.log("you are here")
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something Went Wrong")
        
    }   
}