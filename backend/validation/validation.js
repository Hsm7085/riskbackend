const Joi = require('joi');

const register= Joi.object({
    name: Joi.string().min(3).max(30).required(),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    
    obj: Joi.required(),
});



const registervalidate = (req, res, next) => { 
    
    const { error} = register.validate(req.body); 
    const valid = error == null; 
    
    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');
   
      console.log("error", message); 
      res.send(message);
    //  res.status(422).json({ error: message }) 
} 
    } 

  


module.exports={registervalidate};  