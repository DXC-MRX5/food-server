require("dotenv").config();
const jwt=require("jsonwebtoken");
const secretKey=process.env.SECRET_KEY;

const authorizer=(req,res,next)=>{
    const receivedToken=req.headers["authorization"]
    if(!receivedToken){
        return res.status(200).send({message:"You are not a valid user to get data from this api"})
    }
    const token=receivedToken.split(" ")[1];
    try {
        const validate=jwt.verify(token, secretKey);
        req.userInfo = validate;
    } catch (error) {
        return res.send({message:"invalid Token "+ error.message});
    }
    next();
}
module.exports=authorizer;