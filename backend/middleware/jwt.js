import jwt from 'jsonwebtoken'

export const jwtauthmiddleware = (req,res,next) => {

    // const authorization = req.headers.authorization
    // if(!authorization){
    //    return res.status(404).json("Token Missing");
    // }

    const token = req.headers.authorization;
    if(!token){
        return res.status(404).json("Unauthorizad , token missing" );
    }

    try {
        const decode = jwt.verify(token, process.env.JWT);
        req.user = decode
        next()
        
    } catch (error) {
        console.log('Internal Server Error', error);
        return res.status(404).json({error : 'Invalid Token'})
    }

}

export const generateToken = (userdata) => {
    return jwt.sign(userdata, process.env.JWT)
}

