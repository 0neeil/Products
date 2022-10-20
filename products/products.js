const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: '1234',
    port: 5432,
  })

const addProducts = (request, response) => {
    const {id, name, cost, availability} = request.body

    pool.query('INSERT INTO products (id, name, cost, availability) VALUES ($1, $2, $3, $4) RETURNING *', [id, name, cost, availability], (error, results) => {
        try {
            response.status(201).send(`Products added with: ${results.rows[0].id}`)
        } catch (error) {
            response.json("THIS PRODUCTS ALREADY EXISTS");
        }
    })
}

const updateProducts = (request, response) => {
    const {id, name, cost, availability, oldId} = request.body

    pool.query('UPDATE products SET id = $1, name = $2, cost = $3, availability = $4 WHERE id = $5', [id, name, cost, availability, oldId], (error, resultst)=>{
        try {
            response.json('Norm')
        } catch (error) {
            
            response.json('Ne Norm')
        }
    })
}

const buyProducts = (request,response) =>{
    try {
      const numberInNeed = request.body
      const id = request.params.id
      const username = request.params.username
        console.log(numberInNeed)
      pool.query('SELECT * FROM products WHERE id = $1',[id],(error,results) =>{
        if(error){
          throw error
        }
        const AlteredQuantity = +results.rows[0].availability - numberInNeed.availability
        if( AlteredQuantity >= 0){
          pool.query('UPDATE products SET availability = $1 WHERE id = $2',[AlteredQuantity,id],(error)=>{
            if(error){
              throw error
            }
           
            if(response.status(200)){
            
                pool.query('INSERT INTO purchase_history (id,name,availability, cost, username, date) values ($1, $2, $3, $4, $5, NOW())',
                [id, results.rows[0].name, numberInNeed.availability, numberInNeed.availability*results.rows[0].cost, username],
                (error)=>{
                    if(error){
                        throw error
                      } 
                      response.status(200).send(`purchase done`)
                })
            }
          })
        }
        else {
          response.send(`bag your pardon, we have not enought product we have only ${results.rows[0].availability}`)
        }
      })
    } catch (error) {
      throw error
    }
  
}

const getProducts =  (request, response) => {
    response.json("work")
}

module.exports = {
    addProducts,
    getProducts,
    updateProducts,
    buyProducts
}