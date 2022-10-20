const jwt = require("jsonwebtoken")
const { secretKey } = require("../config/config")

module.exports = function (roles) {
    return function(request, response, next){
        if(request.method === "OPTIONS"){
            next()
        }
    
        try {
            
            const token = request.headers.authorization.split(' ')[1]
            if(!token){
                response.status(403).json({msg: "Користувач не авторизований"})
            }
        
            const decodedToken = jwt.verify(token, secretKey)

            let hasrole = false
            
            if(roles.includes(decodedToken.role)){
                hasrole = true
            }
            if(!hasrole)
                return response.status(403).json("Низький рівень доступу")
            next()
    
        } catch (error) {
            console.log(error)
            response.json("Користувач не авторизований")
        }
    }
}