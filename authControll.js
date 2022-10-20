const Pool = require('pg').Pool
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const {secretKey} = require('./config/config')


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: '1234',
  port: 5432,
})

const registration = async (request, response) => {
    try {
        const {username, password, role} = request.body

        const salt = await bcrypt.genSalt(7);
        const hashpassword = await bcrypt.hash(password, salt);
      
        pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *', [username, hashpassword, role], (error, results) => {
         try {
          response.status(201).send(`User added with : ${results.rows[0].username}`)
         } catch (error) {
           console.log(error)
            response.json("THIS USER ALREADY EXISTS");
         }
      
        }) 
    } catch (error) {
        console.log(error)
    }
}

const login = (request, response) => {
    try {
        const {username,password} = request.body
        try {
          pool.query('SELECT * FROM users WHERE username = $1',[username], async(error, results) => {
            if(results.rows[0]){
             const validPass = await bcrypt.compare(password,results.rows[0].password)
    
             const token = jwt.sign({username: results.rows[0].username, role: results.rows[0].role}, secretKey, {expiresIn: "1h"})
             
             if(validPass){
                response.json({token})
              }
              else{
                response.json('Wrong pass') 
               }
             }else{
            response.status(404).json('User not found')
          }
        })
      } catch (error) {
        response.json('Smth broke')
      }
         
    } catch (error) {
        console.log(error)
    }
}

const getUsers = (request, response) => {
    try {
        pool.query('SELECT * FROM users', (error, results) => {
            response.status(200).json(results.rows)
        })
    } catch (error) {
       console.log(error)
    }
}

    module.exports = {
        registration,
        login,
        getUsers
    }