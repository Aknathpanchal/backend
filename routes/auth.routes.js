const jwt = require('jsonwebtoken');
const secretKey = "secretkey";
const bcrypt = require('bcrypt');
const UserModel= require('../model/modal')
const {Router}= require('express')
const authRouter = Router();

authRouter.post("/signup", async(req,res)=>{
try{
const myplaintextPassword = req.body.password;
console.log(myplaintextPassword)
const salt = await bcrypt.genSaltSync(10);
console.log(salt)
const password = await bcrypt.hash(myplaintextPassword,salt);

const payload = {
    name:req.body.name,
    email:req.body.email,
    password,
}

await UserModel.create(payload)
.then((user)=>{
    return res.send({
        type:"success",
        message:"Singup successfully"
    })
})

}catch(err){
console.log(err)
}
})


authRouter.post("/login", async(req,res)=>{
    try{

    const {email,password} = req.body;
    console.log(email.password)
    const user =await UserModel.findOne({email});

if(!user){
return res.send({
    type:"error",
    message:"Invalid email oruser not exist"
})
}

    const ismypasswordvalid = await bcrypt.compare(password,user.password)
    if(!ismypasswordvalid){
        return res.send({
            type:"error",
            message:"Invalid Password"
        })
        }

        const payload = {
            name:user.name,
            email:user.email,
        }

        const token =  jwt.sign(payload, secretKey);
    
   
        return res.send({
            type:"success",
            message:"Login successfully",
            user:{name:user.name, email:user.email ,userId:user._id,token}
        })
    
    
    }catch(err){
    console.log(err)
    }
    })


module.exports = authRouter
