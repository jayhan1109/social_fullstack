import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";

const protect = async (req,res,next)=>{
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    console.log('token found');
  }

  if(!token){
    req.status(401)
    throw new Error('Not Authorized, no token');
  }

  next();
}

export default protect;