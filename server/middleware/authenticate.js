const jwt= require('jsonwebtoken');
const Person = require('../model/person');

const authenticate = async(req,res,next) =>{
   try{

    const token= req.cookies.jwtoken;
    const verifytoken= jwt.verify(token,'KOMALNIDASPRINGSEMWEBTECHNOLOGIESMERNAPP');
    const rootuser = await Person.findOne({_id: verifytoken._id, "tokens.token":token});
    
    if(!rootuser){throw new Error('User Not Found')}

    req.token= token;
    req.rootuser= rootuser;
    req.userId= rootuser._id;

    next();

   }catch(err){
       res.status(401).send('Unauthorized user');
       console.log(err);
   }
}

module.exports= authenticate;