const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{
    try{
        let token = req.headers['x-api-key']
        if(!token){
            return res.status(400).send("Login required :)")
        }

        let decodeToken = jwt.verify(token,'student-management',(err,decodeToken)=>{
            if (err) {
                return res.status(401).send({status: false, message: err.message})
              } 
              
              else {
                req.userLoggedIn = decodeToken.adminId
                
                next()
              }
            })
          }
    catch(err){

        res.status(500).send(err.message)

    }
}

module.exports = {authenticate}