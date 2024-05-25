import jwt from 'jsonwebtoken';
const createToken =  (userid)=>{
    return jwt.sign({userid}, process.env.JWT_SECRET||"efdfdsscdsc", {expiresIn: '365d'});
}

const verifyToken = (token)=>{
    try {
        return  jwt.verify(token, process.env.JWT_SECRET||"efdfdsscdsc");
    } catch (error) {
        return null;
    }
}

export {createToken, verifyToken}