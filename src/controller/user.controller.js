import user from '../models/user.model.js'
import bcrypt from 'bcrypt'
import {createToken} from "../middleware/token.js"

export async function handleRegister(req,res) {
    const{name,email,password,mobile_number,authType} = req.body
    console.log(req.body)

    try {
        let typeOfUser =""
        if (email === process.env.ADMIN_EMAIL && password === process.env.PASSWORD){
            typeOfUser = "Owner"
        }else{
            typeOfUser = "Customer"
        }
        const check = await user.findOne({email})
        console.log(check)
        if(check?.userType === "Owner"){
            return res.status(400).send("Owner already exist")
        }
        if(check){
            return res.status(400).send("Already Exists")
        }
        const hashPassword = await bcrypt.hash(password,10)

        const option = new user({
            name,
            email,
            password: hashPassword,
            mobile_number,
            authType
        })
        
        await option.save()
        
        return res.status(200).send('User registered successfully!')
        
    } catch (error) {
        console.log(error)
        res.status(500).send("SERVER ERROR")
        
    }
    
}
export async function handleLogin(req,res) {
    const {email,password} = req.body
    // console.log(req.body)

    try {

        const login = await user.findOne({email})
        if(!login) {
            return res.status(404).send("not found")
        }
        // hash password before saving
        const isValidPassword = await bcrypt.compare(password,login.password)
        if (!isValidPassword) {
            return res.status(404).send("Password Or Email is Not Valid")
        }
        // res.status(200).send("Login successful")
        // generate JWT token
        let token = createToken(login)
        login.token = token;
        await login.save()

        let authType = login.authType

        res.cookie('authToken',token,{
            httpOnly :true
        })

        let data = {
            email,
            authType,
            token
        }
        

        res.status(200).send(data)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("SERVER ERROR")
        
    }
    
}

export async function handleGetData(req,res) {
    try {

        const getData = await user.find()
        console.log(getData)
        if (getData.length==0) {
            return res.status(404).send('NOT FOUND')
        }

        res.status(200).send(getData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("SERVER ERROR")        
    }
    
}
export async function handleUpdate(req,res) {
    try {
        const { id } = req.params;
      const updateData = req.body;
  
      // 1. Fetch existing user to compare password
      const existingUser = await user.findById(id);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // 2. Only hash password if it's changed (and not already hashed)
      if (updateData.password && updateData.password !== existingUser.password) {
        const isHashed = updateData.password.startsWith('$2b$'); // bcrypt hash check
        if (!isHashed) {
          const hashPassword = await bcrypt.hash(updateData.password, 10);
          updateData.password = hashPassword;
        }
      }
  
      if (!Object.keys(updateData).length) {
        return res.status(400).json({ message: 'No fields provided for update' });
      }
  
      const updateAuth = await user.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
  
      if (!updateAuth) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json({ message: 'Update successful', updateAuth });
  
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}
export async function  handleDelete(req,res) {
    const {id} = req.body
    console.log(id)
    try {
        const deleteData = await user.findByIdAndDelete({_id:id})
        if(!deleteData){
            return res.status(400).send("NOT DELETE DATA")
        }
        res.status(200).send(deleteData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("SERVER ERROR")
        
    }
}
export async function getLogUser(req, res) {
    const {id} = req.user
    try {
        const getData = await user.findOne({_id:id}).select("-token")
        // console.log(getData)
        if(getData.length == 0){
            return res.status(404).send("NOT FOUND")
        }
        res.status(200).send(getData)
    } catch (error) {
        console.log(error)
        res.status(500).send("SERVER ERROR")
        
    }
    
}

