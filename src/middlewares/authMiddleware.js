const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    const authHandler = req.headers.authorization;
    if(!authHandler || !authHandler.startsWith("Bearer ")){
        return res.status(400).json({message: "No token found"});
    }

    const token = authHandler.split(" ")[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message: "Invalid Token"});
    }
};

module.exports = authMiddleware;